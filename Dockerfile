FROM node:alpine

RUN mkdir /Client
WORKDIR /Client
RUN npm install

EXPOSE 4200
