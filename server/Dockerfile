# dockerfile

# 基于 node lts-alpine 版本镜像，并通过构建阶段命名，将有 node 环境的阶段命名为 build-stage
#（包含 alpine 的镜像版本相比于 latest 版本更加小巧，更适合作为 docker 镜像使用）
FROM node:lts-alpine

# 自定义镜像的默认工作目录
WORKDIR /nestwebstack

# 复制当前目录所有文件到 镜像中 workdir 中
COPY . .

# 如果是国内服务器 设置淘宝源
# RUN npm config set registry https://registry.npm.taobao.org

# 运行 npm ci 安装依赖
RUN npm ci

# 运行 nest build 编译 admin、server 服务
RUN npm run build_admin
RUN npm run build_server

# 编译后只需要生产依赖
# RUN rm -rf node_modules
# RUN npm install --production

# 暴露的端口 3008：客户端 api； 3009：服务端 api
EXPOSE 3008 3009

# 定参 
ENTRYPOINT [ "npm" ,"run"]
# 变参 默认启动 server
# 如要运行 admin 在 docker run image 后加 start:prod_admin 参数
CMD ["start:prod_server"]
# CMD node dist/apps/server/main.js

