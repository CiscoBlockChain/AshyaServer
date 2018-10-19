FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn
COPY . . 
RUN  npm install --cache /tmp/empty-cache \
      && npm run build --production npm install \ 
      && rm -rf /tmp/empty-cache
RUN npm install -g serve
CMD serve -s build
EXPOSE 5000
