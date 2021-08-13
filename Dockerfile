#Creates a layer from node:alpine image.
FROM node:alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 3001

ENTRYPOINT ["npm", "run", "start"]