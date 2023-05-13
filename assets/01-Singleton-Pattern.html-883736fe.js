const e=JSON.parse('{"key":"v-f9505db4","path":"/java/Design-Patterns/01-Singleton-Pattern.html","title":"单例模式","lang":"zh-CN","frontmatter":{"title":"单例模式","icon":"leaf","category":["设计模式"],"description":"单例模式是项目中比较多一种设计模式之一，主要用于大对象或者全局唯一对象的使用。 本文将对单例模式的创建，优化迭代流程进行详细描述 简介 总书记只有一个 场景 适合只需要一个bean的场景，或者内存大的bean 优点 在内存中只有一个实例，减少了内存开销。 可以避免对资源的多重占用。 设置全局访问点,严格控制访问 缺点 单例模式的缺点没有接口，扩展困难。...","head":[["meta",{"property":"og:url","content":"https://github.com/dabaoqiang/openTechnology-learning-doc.git/openTechnology-learning-doc/java/Design-Patterns/01-Singleton-Pattern.html"}],["meta",{"property":"og:site_name","content":"学习教程"}],["meta",{"property":"og:title","content":"单例模式"}],["meta",{"property":"og:description","content":"单例模式是项目中比较多一种设计模式之一，主要用于大对象或者全局唯一对象的使用。 本文将对单例模式的创建，优化迭代流程进行详细描述 简介 总书记只有一个 场景 适合只需要一个bean的场景，或者内存大的bean 优点 在内存中只有一个实例，减少了内存开销。 可以避免对资源的多重占用。 设置全局访问点,严格控制访问 缺点 单例模式的缺点没有接口，扩展困难。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-13T04:35:23.000Z"}],["meta",{"property":"article:author","content":"Mr.Dabaoqiang"}],["meta",{"property":"article:modified_time","content":"2023-05-13T04:35:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"单例模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-13T04:35:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Dabaoqiang\\",\\"url\\":\\"https://github.com/dabaoqiang/openTechnology-learning-doc.git\\"}]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"场景","slug":"场景","link":"#场景","children":[]},{"level":2,"title":"优点","slug":"优点","link":"#优点","children":[]},{"level":2,"title":"缺点","slug":"缺点","link":"#缺点","children":[]},{"level":2,"title":"代码栗子","slug":"代码栗子","link":"#代码栗子","children":[{"level":3,"title":"饿汉式","slug":"饿汉式","link":"#饿汉式","children":[]},{"level":3,"title":"懒汉式","slug":"懒汉式","link":"#懒汉式","children":[]},{"level":3,"title":"内部类式","slug":"内部类式","link":"#内部类式","children":[]},{"level":3,"title":"容器单例式","slug":"容器单例式","link":"#容器单例式","children":[]},{"level":3,"title":"枚举式","slug":"枚举式","link":"#枚举式","children":[]},{"level":3,"title":"序列化单例","slug":"序列化单例","link":"#序列化单例","children":[]},{"level":3,"title":"ThreadLocal单例式","slug":"threadlocal单例式","link":"#threadlocal单例式","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"项目源码地址","slug":"项目源码地址","link":"#项目源码地址","children":[]}],"git":{"createdTime":1683821049000,"updatedTime":1683952523000,"contributors":[{"name":"大宝强","email":"1307536605@qq.com","commits":2}]},"readingTime":{"minutes":4.37,"words":1310},"filePathRelative":"java/Design-Patterns/01-Singleton-Pattern.md","localizedDate":"2023年5月11日","autoDesc":true}');export{e as data};
