# Spring Cloud Ribbon负载均衡
`ribbon`设计目的是为了解决微服务之间的调用而存在，所以第一含有RPC调用的功能，第二在多实例列表中选择哪一个最优实例的功能。

一个是`RestTemplate`，一个是注解`@loadbalanced`。

`RestTemplate`是发送RPC服务与服务相互请求协议的一种实现。

`@loadbalanced`是在微服务调用之间，A服务调用B服务，A需要使用合适的路由算法，从集群的B服务，选取合适自己的服务地址的实现。

而在代码实现中，给发起一个请求，加以前置的处理，最常见的方式就是拦截器模式，所以，这个也是一样，在发起请求的时候拦截，

最后得到IP，加以请求。

## RestTemplate出发

还是从 RestTemplate出发

`org.springframework.web.client.RestTemplate#doExecute`

```java
	@Nullable
	protected <T> T doExecute(URI url, @Nullable HttpMethod method, @Nullable RequestCallback requestCallback,
			@Nullable ResponseExtractor<T> responseExtractor) throws RestClientException {

		Assert.notNull(url, "URI is required");
		Assert.notNull(method, "HttpMethod is required");
		ClientHttpResponse response = null;
		try {
            // ClientHttpRequest = InterceptingClientHttpRequest
			ClientHttpRequest request = createRequest(url, method);
			if (requestCallback != null) {
				requestCallback.doWithRequest(request);
			}
            // 看看里面发生了什么。
			response = request.execute();
			handleResponse(url, method, response);
			return (responseExtractor != null ? responseExtractor.extractData(response) : null);
		}
		catch (IOException ex) {
			String resource = url.toString();
			String query = url.getRawQuery();
			resource = (query != null ? resource.substring(0, resource.indexOf('?')) : resource);
			throw new ResourceAccessException("I/O error on " + method.name() +
					" request for \"" + resource + "\": " + ex.getMessage(), ex);
		}
		finally {
			if (response != null) {
				response.close();
			}
		}
	}
```

`org.springframework.http.client.AbstractClientHttpRequest#execute`

```java
	@Override
	public final ClientHttpResponse execute() throws IOException {
		assertNotExecuted();
		ClientHttpResponse result = executeInternal(this.headers);
		this.executed = true;
		return result;
	}
	protected abstract ClientHttpResponse executeInternal(HttpHeaders headers) throws IOException;
```

`org.springframework.http.client.AbstractBufferingClientHttpRequest#executeInternal(org.springframework.http.HttpHeaders)`

```java
	@Override
	protected ClientHttpResponse executeInternal(HttpHeaders headers) throws IOException {
		byte[] bytes = this.bufferedOutput.toByteArray();
		if (headers.getContentLength() < 0) {
			headers.setContentLength(bytes.length);
		}
		ClientHttpResponse result = executeInternal(headers, bytes);
		this.bufferedOutput = new ByteArrayOutputStream(0);
		return result;
	}
	protected abstract ClientHttpResponse executeInternal(HttpHeaders headers, byte[] bufferedOutput)
			throws IOException;
```

`org.springframework.http.client.InterceptingClientHttpRequest#executeInternal`

```java
	@Override
	protected final ClientHttpResponse executeInternal(HttpHeaders headers, byte[] bufferedOutput) throws IOException {
		InterceptingRequestExecution requestExecution = new InterceptingRequestExecution();
		return requestExecution.execute(this, bufferedOutput);
	}
	private class InterceptingRequestExecution implements ClientHttpRequestExecution {
		// 这个拦截器是啥？ ClientHttpRequestInterceptor = LoadBalancerInterceptor
		private final Iterator<ClientHttpRequestInterceptor> iterator;

		public InterceptingRequestExecution() {
			this.iterator = interceptors.iterator();
		}

		@Override
		public ClientHttpResponse execute(HttpRequest request, byte[] body) throws IOException {
			if (this.iterator.hasNext()) {
				ClientHttpRequestInterceptor nextInterceptor = this.iterator.next();
				return nextInterceptor.intercept(request, body, this);
			}
			else {
				HttpMethod method = request.getMethod();
				Assert.state(method != null, "No standard HTTP method");
				ClientHttpRequest delegate = requestFactory.createRequest(request.getURI(), method);
				request.getHeaders().forEach((key, value) -> delegate.getHeaders().addAll(key, value));
				if (body.length > 0) {
					if (delegate instanceof StreamingHttpOutputMessage) {
						StreamingHttpOutputMessage streamingOutputMessage = (StreamingHttpOutputMessage) delegate;
						streamingOutputMessage.setBody(outputStream -> StreamUtils.copy(body, outputStream));
					}
					else {
						StreamUtils.copy(body, delegate.getBody());
					}
				}
				return delegate.execute();
			}
		}
	}
```

为什么拦截器`ClientHttpRequestInterceptor` = `LoadBalancerInterceptor`？

有一个自动装载类 `org.springframework.cloud.client.loadbalancer.LoadBalancerAutoConfiguration`

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(RestTemplate.class)
@ConditionalOnBean(LoadBalancerClient.class)
@EnableConfigurationProperties(LoadBalancerRetryProperties.class)
public class LoadBalancerAutoConfiguration {
    
    // 被@LoadBalanced标记过的restTemplates
 	@LoadBalanced
	@Autowired(required = false)
	private List<RestTemplate> restTemplates = Collections.emptyList();

	@Autowired(required = false)
	private List<LoadBalancerRequestTransformer> transformers = Collections.emptyList();
    
	@Bean
	public SmartInitializingSingleton loadBalancedRestTemplateInitializerDeprecated(
			final ObjectProvider<List<RestTemplateCustomizer>> restTemplateCustomizers) {
		return () -> restTemplateCustomizers.ifAvailable(customizers -> {
			for (RestTemplate restTemplate : LoadBalancerAutoConfiguration.this.restTemplates) {
				for (RestTemplateCustomizer customizer : customizers) {
                    // 将拦截器注入到RestTemplate
					customizer.customize(restTemplate);
				}
			}
		});
	}    
    
    // 这个是重点哦，
	@Configuration(proxyBeanMethods = false)
	@ConditionalOnMissingClass("org.springframework.retry.support.RetryTemplate")
	static class LoadBalancerInterceptorConfig {

		@Bean
		public LoadBalancerInterceptor loadBalancerInterceptor(
				LoadBalancerClient loadBalancerClient,
				LoadBalancerRequestFactory requestFactory) {
			return new LoadBalancerInterceptor(loadBalancerClient, requestFactory);
		}

		@Bean
		@ConditionalOnMissingBean
		public RestTemplateCustomizer restTemplateCustomizer(
				final LoadBalancerInterceptor loadBalancerInterceptor) {
			return restTemplate -> {
				List<ClientHttpRequestInterceptor> list = new ArrayList<>(
						restTemplate.getInterceptors());
				list.add(loadBalancerInterceptor);
				restTemplate.setInterceptors(list);
			};
		}

	}    
    
}
```

由上文可知，在RestTemplate发生http请求时，被`LoadBalancerInterceptor`拦截，我们看下这里面的业务。

`org.springframework.cloud.client.loadbalancer.LoadBalancerInterceptor`

```java
public class LoadBalancerInterceptor implements ClientHttpRequestInterceptor {

    // 根据自动装配类 RibbonAutoConfiguration loadBalancer =  RibbonLoadBalancerClient
	private LoadBalancerClient loadBalancer;

	private LoadBalancerRequestFactory requestFactory;

	public LoadBalancerInterceptor(LoadBalancerClient loadBalancer,
			LoadBalancerRequestFactory requestFactory) {
		this.loadBalancer = loadBalancer;
		this.requestFactory = requestFactory;
	}

	public LoadBalancerInterceptor(LoadBalancerClient loadBalancer) {
		// for backwards compatibility
		this(loadBalancer, new LoadBalancerRequestFactory(loadBalancer));
	}

	@Override
	public ClientHttpResponse intercept(final HttpRequest request, final byte[] body,
			final ClientHttpRequestExecution execution) throws IOException {
		final URI originalUri = request.getURI();
		String serviceName = originalUri.getHost();
		Assert.state(serviceName != null,
				"Request URI does not contain a valid hostname: " + originalUri);.
        // 我们只关注这个重点，即转发链接流程     
		return this.loadBalancer.execute(serviceName,this.requestFactory.createRequest(request, body, execution));
	}

}
```

## 获取服务地址IP规则

`org.springframework.cloud.netflix.ribbon.RibbonLoadBalancerClient#execute(java.lang.String, org.springframework.cloud.client.loadbalancer.LoadBalancerRequest<T>)`

```java
	@Override
	public <T> T execute(String serviceId, LoadBalancerRequest<T> request)
			throws IOException {
		return execute(serviceId, request, null);
	}

	public <T> T execute(String serviceId, LoadBalancerRequest<T> request, Object hint)
			throws IOException {
        // 获取负载均衡器 根据serviceId = "spring-cloud-user"
        // 根据 RibbonClientConfiguration，loadBalancer = ZoneAwareLoadBalancer
		ILoadBalancer loadBalancer = getLoadBalancer(serviceId);
        // 这里面发生了啥，就是规则算法选择并且返回服务列表
		Server server = getServer(loadBalancer, hint);
		if (server == null) {
			throw new IllegalStateException("No instances available for " + serviceId);
		}
		RibbonServer ribbonServer = new RibbonServer(serviceId, server,
				isSecure(server, serviceId),
				serverIntrospector(serviceId).getMetadata(server));

		return execute(serviceId, ribbonServer, request);
	}

	protected Server getServer(ILoadBalancer loadBalancer, Object hint) {
		if (loadBalancer == null) {
			return null;
		}
		// Use 'default' on a null hint, or just pass it on?
		return loadBalancer.chooseServer(hint != null ? hint : "default");
	}
```

`com.netflix.loadbalancer.BaseLoadBalancer#chooseServer`

```java
   protected IRule rule = DEFAULT_RULE;

   private final static IRule DEFAULT_RULE = new RoundRobinRule();

   public Server chooseServer(Object key) {
        if (counter == null) {
            counter = createCounter();
        }
        counter.increment();
        if (rule == null) {
            return null;
        } else {
            try {
                // rule =  RoundRobinRule  
                // IRule RibbonClientConfiguration 里面已被设置算法为 ZoneAvoidanceRule
                // ZoneAvoidanceRule 继承了 PredicateBasedRule
                return rule.choose(key);
            } catch (Exception e) {
                logger.warn("LoadBalancer [{}]:  Error choosing server for key {}", name, key, e);
                return null;
            }
        }
    }
    private final Counter createCounter() {
        return Monitors.newCounter("LoadBalancer_ChooseServer");
    }

```

`com.netflix.loadbalancer.PredicateBasedRule`

```java
    @Override
    public Server choose(Object key) {
        ILoadBalancer lb = getLoadBalancer();
        Optional<Server> server = getPredicate().chooseRoundRobinAfterFiltering(lb.getAllServers(), key);
        if (server.isPresent()) {
            return server.get();
        } else {
            return null;
        }       
    }
```

`com.netflix.loadbalancer.AbstractServerPredicate#chooseRoundRobinAfterFiltering(java.util.List<com.netflix.loadbalancer.Server>, java.lang.Object)`

```java
    public Optional<Server> chooseRoundRobinAfterFiltering(List<Server> servers, Object loadBalancerKey) {
        List<Server> eligible = getEligibleServers(servers, loadBalancerKey);
        if (eligible.size() == 0) {
            return Optional.absent();
        }
        return Optional.of(eligible.get(incrementAndGetModulo(eligible.size())));
    }

    public List<Server> getEligibleServers(List<Server> servers, Object loadBalancerKey) {
        if (loadBalancerKey == null) {
            return ImmutableList.copyOf(Iterables.filter(servers, this.getServerOnlyPredicate()));            
        } else {
            List<Server> results = Lists.newArrayList();
            for (Server server: servers) {
                if (this.apply(new PredicateKey(loadBalancerKey, server))) {
                    results.add(server);
                }
            }
            return results;            
        }
    }
	// 轮询
    private int incrementAndGetModulo(int modulo) {
        for (;;) {
            int current = nextIndex.get();
            int next = (current + 1) % modulo;
            if (nextIndex.compareAndSet(current, next) && current < modulo)
                return current;
        }
    }
```

`getLoadBalancer(serviceId); ` 这个里面很复杂，主要是完成获取负载均衡器的选择。

第一，要完成负载均衡，必须拿到服务列表，在默认没有注册中心的时候，通过配置去拿，然后new一个定时任务30s去更新一次配置。

`DynamicServerListLoadBalancer`， enableAndInitLearnNewServersFeature， ServerListUpdater = PollingServerListUpdater（30s ）

第二，为了保证所缓存下来的服务列表是监控的，new了一个心跳任务类，每隔10s就去跑一次。IPing

`BaseLoadBalancer` ，setupPingTask()， IPing ping = null; 心跳检测

通过配置文件`RibbonClientConfiguration`， ping  = DummyPing() ,`pingerStrategy.pingServers(ping, allServers);`

第三，获取负载均衡器，拿到了地址，需要选择IRule，那个算法去获取地址。

`getServer(loadBalancer, hint);`

`RandomRule`,`BestAvailableRule`,`ZoneAvoidanceRule`,`WeightedResponseTimeRule`

这个在之前的文档已经梳理完，现在就是要完成拿到地址之后的调用，这么做转换的。

## 地址转换

org.springframework.cloud.netflix.ribbon.RibbonLoadBalancerClient#execute(java.lang.String, org.springframework.cloud.client.ServiceInstance, org.springframework.cloud.client.loadbalancer.LoadBalancerRequest\<T>)

```java
	@Override
	public <T> T execute(String serviceId, ServiceInstance serviceInstance,
			LoadBalancerRequest<T> request) throws IOException {
		Server server = null;
		if (serviceInstance instanceof RibbonServer) {
			server = ((RibbonServer) serviceInstance).getServer();
		}
		if (server == null) {
			throw new IllegalStateException("No instances available for " + serviceId);
		}

		RibbonLoadBalancerContext context = this.clientFactory
				.getLoadBalancerContext(serviceId);
		RibbonStatsRecorder statsRecorder = new RibbonStatsRecorder(context, server);

		try {
            // 这里面发生了啥？
            // request = LoadBalancerRequestFactory
			T returnVal = request.apply(serviceInstance);
			statsRecorder.recordStats(returnVal);
			return returnVal;
		}
		// catch IOException and rethrow so RestTemplate behaves correctly
		catch (IOException ex) {
			statsRecorder.recordStats(ex);
			throw ex;
		}
		catch (Exception ex) {
			statsRecorder.recordStats(ex);
			ReflectionUtils.rethrowRuntimeException(ex);
		}
		return null;
	}
```

`org.springframework.cloud.client.loadbalancer.LoadBalancerRequestFactory`

这里是声明

```java
public class LoadBalancerRequestFactory {

	private LoadBalancerClient loadBalancer;

	private List<LoadBalancerRequestTransformer> transformers;

	public LoadBalancerRequestFactory(LoadBalancerClient loadBalancer,
			List<LoadBalancerRequestTransformer> transformers) {
		this.loadBalancer = loadBalancer;
		this.transformers = transformers;
	}

	public LoadBalancerRequestFactory(LoadBalancerClient loadBalancer) {
		this.loadBalancer = loadBalancer;
	}

	public LoadBalancerRequest<ClientHttpResponse> createRequest(
			final HttpRequest request, final byte[] body,
			final ClientHttpRequestExecution execution) {
		return instance -> {
            // lmba 表达式这个是声明
            // request.apply(serviceInstance) 调用的就是 ServiceRequestWrapper 
			HttpRequest serviceRequest = new ServiceRequestWrapper(request, instance,
					this.loadBalancer);
			if (this.transformers != null) {
				for (LoadBalancerRequestTransformer transformer : this.transformers) {
					serviceRequest = transformer.transformRequest(serviceRequest,
							instance);
				}
			}
            // 返回的是这个 ClientHttpRequestExecution 
			return execution.execute(serviceRequest, body);
		};
	}

}
```

进入到 `ServiceRequestWrapper`

```java
	@Override
	public URI getURI() {
        // 将服务名称替换成 地址 http://localhost:8082/orders
		URI uri = this.loadBalancer.reconstructURI(this.instance, getRequest().getURI());
		return uri;
	}
```

这里是使用

`org.springframework.http.client.InterceptingClientHttpRequest`

```java
class InterceptingClientHttpRequest extends AbstractBufferingClientHttpRequest {

	private final ClientHttpRequestFactory requestFactory;

	private final List<ClientHttpRequestInterceptor> interceptors;

	private HttpMethod method;

	private URI uri;


	protected InterceptingClientHttpRequest(ClientHttpRequestFactory requestFactory,
			List<ClientHttpRequestInterceptor> interceptors, URI uri, HttpMethod method) {

		this.requestFactory = requestFactory;
		this.interceptors = interceptors;
		this.method = method;
		this.uri = uri;
	}


	@Override
	public HttpMethod getMethod() {
		return this.method;
	}

	@Override
	public String getMethodValue() {
		return this.method.name();
	}

	@Override
	public URI getURI() {
		return this.uri;
	}

	@Override
	protected final ClientHttpResponse executeInternal(HttpHeaders headers, byte[] bufferedOutput) throws IOException {
		InterceptingRequestExecution requestExecution = new InterceptingRequestExecution();
		return requestExecution.execute(this, bufferedOutput);
	}


	private class InterceptingRequestExecution implements ClientHttpRequestExecution {

		private final Iterator<ClientHttpRequestInterceptor> iterator;

		public InterceptingRequestExecution() {
			this.iterator = interceptors.iterator();
		}

		@Override
		public ClientHttpResponse execute(HttpRequest request, byte[] body) throws IOException {
            // 现在走执行就不是拦截了。
			if (this.iterator.hasNext()) {
				ClientHttpRequestInterceptor nextInterceptor = this.iterator.next();
				return nextInterceptor.intercept(request, body, this);
			}
            // 走到了这里
			else {
				HttpMethod method = request.getMethod();
				Assert.state(method != null, "No standard HTTP method");
                // request.getURI() 就是重造链接 ServiceRequestWrapper#getURI()
				ClientHttpRequest delegate = requestFactory.createRequest(request.getURI(), method);
				request.getHeaders().forEach((key, value) -> delegate.getHeaders().addAll(key, value));
				if (body.length > 0) {
					if (delegate instanceof StreamingHttpOutputMessage) {
						StreamingHttpOutputMessage streamingOutputMessage = (StreamingHttpOutputMessage) delegate;
						streamingOutputMessage.setBody(outputStream -> StreamUtils.copy(body, outputStream));
					}
					else {
						StreamUtils.copy(body, delegate.getBody());
					}
				}
                // 执行真正的请求
				return delegate.execute();
			}
		}
	}

}
```

回到重构url

`org.springframework.cloud.netflix.ribbon.RibbonLoadBalancerClient`

```java
	@Override
	public URI reconstructURI(ServiceInstance instance, URI original) {
		Assert.notNull(instance, "instance can not be null");.
        // spring-cloud-order-service
		String serviceId = instance.getServiceId();
		RibbonLoadBalancerContext context = this.clientFactory
				.getLoadBalancerContext(serviceId);

		URI uri;
		Server server;
		if (instance instanceof RibbonServer) {
			RibbonServer ribbonServer = (RibbonServer) instance;
			server = ribbonServer.getServer();
			uri = updateToSecureConnectionIfNeeded(original, ribbonServer);
		}
		else {
			server = new Server(instance.getScheme(), instance.getHost(),
					instance.getPort());
			IClientConfig clientConfig = clientFactory.getClientConfig(serviceId);
			ServerIntrospector serverIntrospector = serverIntrospector(serviceId);
			uri = updateToSecureConnectionIfNeeded(original, clientConfig,
					serverIntrospector, server);
		}
		return context.reconstructURIWithServer(server, uri);
	}

	public static URI updateToSecureConnectionIfNeeded(URI uri, IClientConfig config,
			ServerIntrospector serverIntrospector, Server server) {
		String scheme = uri.getScheme();

		if (StringUtils.isEmpty(scheme)) {
			scheme = "http";
		}

		if (!StringUtils.isEmpty(uri.toString())
				&& unsecureSchemeMapping.containsKey(scheme)
				&& isSecure(config, serverIntrospector, server)) {
			return upgradeConnection(uri, unsecureSchemeMapping.get(scheme));
		}
		return uri;
	}
	private static URI upgradeConnection(URI uri, String scheme) {
		UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromUri(uri)
				.scheme(scheme);
		if (uri.getRawQuery() != null) {
			// When building the URI, UriComponentsBuilder verify the allowed characters
			// and does not
			// support the '+' so we replace it for its equivalent '%20'.
			// See issue https://jira.spring.io/browse/SPR-10172
			uriComponentsBuilder.replaceQuery(uri.getRawQuery().replace("+", "%20"));
		}
        // 完成构建 http://localhost:8082/orders
		return uriComponentsBuilder.build(true).toUri();
	}
```

spring-cloud-order-service.ribbon.listfServers=localhost:8080,localhost:8082

## 权重规则

有一个定时任务，去计算权重。

如果觉得规则不符合，可以自己实现。

## 流程图设计
![image-20230516215730976](/assets/SpringCloud/Spring-Cloud-Ribbon源码分析.jpg)