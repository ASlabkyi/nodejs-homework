FROM node

WORKDIR /app

COPY . .

RUN yarn

ENTRYPOINT 3000

CMD [ "yarn", "start" ]