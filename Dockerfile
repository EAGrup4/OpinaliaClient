FROM node:alpine

RUN mkdir /Client
WORKDIR /Client
RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200
