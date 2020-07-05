# nest-webstack

NestJs+VueJS+MongoDB 开发 WebStack 网站 - 源码

```shell
# 全局安装 nestjs cli
sudo npm g -i @nestjs/cli

# nest 创建项目
nest new server

# 建议选择 yarn 安装，安装项目的全部依赖
yarn
# or
yarn install
```

项目后端（服务端）分管理端、客户端，所以工作空间使用 [Monorepo（单体仓库）模式](https://docs.nestjs.cn/7/cli?id=monorepo%e6%a8%a1%e5%bc%8f)

```shell
cd server
# 创建子应用 管理端
nest g app admin

# 创建完后 admin 为服务管理端，server 服务客户端

# 启动子项目 开发的时候加 -w : watch，监听变化
nest start -w admin

# 创建公共模块，数据库模块，独立于其他模块 注意是 server 文件夹下面
nest g lib db
# 改用 @libs 为默认公共模块名称

# 安装 typegoose
yarn add @nestjs-typegoose @typegoose/typegoose

# 安装 mongoose 模块与 ts 智能提示
yarn add mongoose @types/mongoose
```

在 db/src 创建 models 并创建相应数据模型，在 db.module 导出
注意命名规范：一般面向对象（数据）模型的定义是一种具体的类别，如：人类；所以用单数形式；而其他的控制器是对具体的类操作，如果：所有用户，具体客户，所有用复数。这也是 NestJS 官方规范。

```shell
# 在 admin 服务管理端创建 user 模块与控制器
nest g mo -p admin users

nest g co -p admin users
```

```shell
# 安装 nestjs-mongoose-crud 模块，在对应的控制器中一行代码执行 CRUD
yarn add nestjs-mongoose-crud

# 安装 nest 官方 Swagger 及 express ui
yarn add @nestjs/swagger swagger-ui-express
```

在 main.js 中配置好 Swagger

