FROM node:14-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --global nodemon --unsafe-perm exp
RUN npm install --development --silent && mv node_modules ../
COPY . .
EXPOSE 6700
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
