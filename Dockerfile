FROM node:alpine

RUN mkdir /Client
WORKDIR /Client
COPY package.json /Client
RUN cd /Client
RUN npm install -g @angular/cli
RUN npm install
COPY . /Client

EXPOSE 4200
