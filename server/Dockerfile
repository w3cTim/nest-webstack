# dockerfile

# 基于 node lts-alpine 版本镜像，并通过构建阶段命名，将有 node 环境的阶段命名为 build-stage
#（包含 alpine 的镜像版本相比于 latest 版本更加小巧，更适合作为 docker 镜像使用）
FROM node:lts-alpine

# 将工作区设为 /app，和其他系统文件隔离
WORKDIR /nestWebStack

COPY . .

# 如果是国内服务器 设置淘宝源
# RUN npm config set registry https://registry.npm.taobao.org

# 运行 npm install 安装依赖
RUN npm install

# 运行 nest build 编译 admin、server 服务
RUN npm run build_admin
RUN npm run build_server

# 暴露的端口
EXPOSE 3008 3009

# 定参 
ENTRYPOINT [ "npm" ,"run"]
# 变参 默认启动 server
# 如要运行 admin 在 docker run image 后加 start:prod_admin 参数
CMD ["start:prod_server"]
# CMD node dist/apps/server/main.js

