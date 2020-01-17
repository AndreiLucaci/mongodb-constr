# mongodb-constr
A simple mongo db connections string builder for NodeJS using the fluid builder pattern

## Contents
The current implementation supports a minimalistic Mongo db connection string builder.

Custom models:

`IMongoUrl`:
```typescript
interface IMongoUrl {
  host: string;
  port: number;
}
```

`IConnectionStringSettings`:
```typescript
interface IConnectionStringSettings {
  username: string | undefined;
  password: string | undefined;
  url: IMongoUrl | undefined;
  replicas: IMongoUrl[] | undefined;
  database: string | undefined;
  options: URLSearchParams | undefined;
}
```

And the builder methods:
```typescript
class ConnectionStringBuilder {
    constructor(settings?: IConnectionStringSettings);
    getSettings(): IConnectionStringSettings;
    withOptions(options: any): ConnectionStringBuilder;
    withCredentials(username: string, password?: string): ConnectionStringBuilder;
    withUrl(url: IMongoUrl): ConnectionStringBuilder;
    withReplicas(urls: IMongoUrl[]): ConnectionStringBuilder;
    withDatabase(database: string): ConnectionStringBuilder;
    build(): string;
}
```

The module exports an object:
```typescript
const MongoConStr: {
    create: (settings: IConnectionStringSettings) => string;
    builder: () => ConnectionStringBuilder;
};
```

- **`builder`** returns an empty `ConnectionStringBuilder` to be used
- **`create`** takes a `IConnectionStringSettings` object, creates a `ConnectionStringBuilder` based on the settings, builds the connection string, and returns it.

## Exammples:
```javascript
const { MongoConStr } = require('./lib/index');

const conStr = MongoConStr.builder()
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
// should output: mongodb://asdf:1234@host1:7777,host2:7878,host3:9887/my-database?option1=value1&option2=value2&option3=value3

const conStrSettings = MongoConStr.create({
  username: 'myusername',
  password: 'mysecretp@a$4w0rd',
  database: 'awesomeDb',
  url: {
    host: 'host',
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
// should output: mongodb://myusername:mysecretp@a$4w0rd@host:2018,host2:2019,host3:2020/awesomeDb?option1=value1&option2=value2&option3=value3

console.log(MongoConStr.builder().withCredentials('me').withReplicas([{host:'h1', port:1}]).build());
// should output: mongodb://me@h1:1
```

## Instalation 
```bash
yarn add mongodb-constr
# or
npm install mongodb-constr
```