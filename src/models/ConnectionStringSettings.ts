import { IConnectionStringSettings } from './IConnectionStringSettings';
import { IMongoUrl } from './IMongoUrl';

export class ConnectionStringSettings implements IConnectionStringSettings {
  public username?: string | undefined;
  public password?: string | undefined;
  public url?: IMongoUrl | undefined;
  public replicas?: IMongoUrl[] | undefined;
  public database?: string | undefined;
  public options?: URLSearchParams | undefined;
  constructor(
    username: string | undefined,
    password: string | undefined,
    url: IMongoUrl | undefined,
    replicas: IMongoUrl[] | undefined,
    database: string | undefined,
    options: URLSearchParams | undefined,
  ) {
    this.username = username;
    this.password = password;
    this.url = url;
    this.replicas = replicas;
    this.database = database;
    this.options = options;
  }
}
