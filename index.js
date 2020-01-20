const { MongoConStr, MongoDbVersion } = require('./lib/index');

const conStr = MongoConStr.builder(MongoDbVersion.VERSION_34)
  .withCredentials("asdf", "1234")
  .withDatabase("my-database")
  .withUrl({host: 'host1', port: 7777})
  .withReplicas([
    {host: 'host2', port: 7878},
    {host: 'host3', port: 9887}
  ])
  .withOptions({
    option1: 'value1',
    option2: 'value2',
    option3: 'value3'
  })
  .build();

console.log(conStr);

const conStrSettings = MongoConStr.create({
  username: 'myusername',
  password: 'mysecretp@a$4w0rd',
  database: 'awesomeDb',
  url: {
    host: 'new-srv-host.mongodb_url_host.com',
    port: 2018,
  },
  replicas: [
    {
      host: 'host2',
      port: 2019
    },
    {
      host: 'host3',
      port: 2020
    }
  ],
  options: {
    option1: 'value1',
    option2: 'value2',
    option3: 'value3'
  }
});

console.log(conStrSettings);

console.log(MongoConStr.builder(MongoDbVersion.VERSION_34).withCredentials('me').withReplicas([{host:'h1', port:1}]).build());