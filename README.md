# mongodb-constr
[![npm version](https://badge.fury.io/js/mongodb-constr.svg)](https://badge.fury.io/js/mongodb-constr) [![Build Status](https://travis-ci.com/AndreiLucaci/mongodb-constr.svg?branch=master)](https://travis-ci.com/AndreiLucaci/mongodb-constr)

[![NPM](https://nodei.co/npm/mongodb-constr.png)](https://nodei.co/npm/mongodb-constr/)

A simple mongo db connections string builder for NodeJS using the fluid builder pattern

## Contents
The current implementation supports MongoDb driver 3.4 and 3.6

Custom models:

`IMongoUrl`:
```typescript
interface IMongoUrl {
  host: string;
  port: number;
  toString(usePort?: boolean): string;
  equals(obj: IMongoUrl): boolean;
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

`MongoDbVersion`:
```typescript
enum MongoDbVersion {
  VERSION_34 = "VERSION_34",
  VERSION_36 = "VERSION_36"
}
```

Builder interface
`IConnectionStringBuilder`
```typescript
interface IConnectionStringBuilder {
  getSettings(): IConnectionStringSettings;
  withOptions(options: any): IConnectionStringBuilder;
  withCredentials(username: string, password: string): IConnectionStringBuilder;
  withUrl(url: IMongoUrl): IConnectionStringBuilder;
  withReplicas(urls: IMongoUrl[]): IConnectionStringBuilder;
  withDatabase(database: string): IConnectionStringBuilder;
  build(): string;
}
```

The module exports an object:
```typescript
const MongoConStr: {
  create: (settings: IConnectionStringSettings, version?: MongoDbVersion) => string;
  builder: (version?: MongoDbVersion) => IConnectionStringBuilder;
};
```

- **`builder`** returns an empty `IConnectionStringBuilder` to be used
  - defaults to `MongoDbVersion.VERSION_36`
- **`create`** takes a `IConnectionStringSettings` object, creates a `ConnectionStringBuilder` based on the settings, builds the connection string, and returns it,
  - defaults to `MongoDbVersion.VERSION_36`

## Exammples:
```javascript
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
// should output: mongodb+srv://myusername:mysecretp@a$4w0rd@new-srv-host.mongodb_url_host.com/awesomeDb?option1=value1&option2=value2&option3=value3

console.log(MongoConStr.builder(MongoDbVersion.VERSION_34).withCredentials('me').withReplicas([{host:'h1', port:1}]).build());
// should output: mongodb://me@h1:1
```

## Instalation 
```bash
yarn add mongodb-constr
# or
npm install mongodb-constr
```