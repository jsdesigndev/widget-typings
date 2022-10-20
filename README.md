# 即时设计小组件 API 类型

此仓库包含即时设计小组件 API 类型包。

## 用法

1. 安装
由于小组件 api 中依然可以使用插件 api，所以你需要同时安装`@jsdesigndeveloper/plugin-typings` 和 `@jsdesigndeveloper/widget-typings`。

    ```sh
    npm i --save-dev @jsdesigndeveloper/plugin-typings @jsdesigndeveloper/widget-typings

    # or
    yarn add -D @jsdesigndeveloper/plugin-typings @jsdesigndeveloper/widget-typings
    ```

2. 配置 _tsconfig.json_
    ```js
    {
        "compilerOptions": {
            "typeRoots": [
                "./node_modules/@types",
                "./node_modules/@jsdesigndeveloper"
            ]
        }
    }
    ```
