# dockerfile

# 基于 node lts-alpine 版本镜像，并通过构建阶段命名，将有 node 环境的阶段命名为 build-stage
#（包含 alpine 的镜像版本相比于 latest 版本更加小巧，更适合作为 docker 镜像使用）
FROM node:lts-alpine

# 将工作区设为 /app，和其他系统文件隔离
WORKDIR /nestWebStack

COPY . .

# 如果是国内服务器 可设置淘宝源
# RUN npm config set registry https://registry.npm.taobao.org

# 运行 npm install 在容器中安装依赖
RUN npm install

# 运行 nest build 在容器中编译 admin server 服务
RUN npm run build_admin
RUN npm run build_server

# 暴露的端口
EXPOSE 3008 3009

ENTRYPOINT [ "npm" ,"run"]
CMD ["start:prod_server"]
# CMD npm run start:prod_server

