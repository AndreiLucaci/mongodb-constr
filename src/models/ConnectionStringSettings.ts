import { IMongoUrl } from './IMongoUrl';
import { IConnectionStringSettings } from './IConnectionStringSettings';
export class ConnectionStringSettings implements IConnectionStringSettings {
  public username: string | undefined;
  public password: string | undefined;
  public url: IMongoUrl | undefined;
  public replicas: IMongoUrl[] | undefined;
  public database: string | undefined;
  public options: URLSearchParams | undefined;
  constructor(
    username: string | undefined = undefined,
    password: string | undefined = undefined,
    url: IMongoUrl | undefined = undefined,
    replicas: IMongoUrl[] | undefined = undefined,
    database: string | undefined = undefined,
    options: URLSearchParams | undefined = undefined,
  ) {
    this.username = username;
    this.password = password;
    this.url = url;
    this.replicas = replicas;
    this.database = database;
    this.options = options;
  }
}
