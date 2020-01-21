import { IConnectionStringSettings } from './IConnectionStringSettings';
import { IMongoUrl } from './IMongoUrl';

export class ConnectionStringSettings implements IConnectionStringSettings {
  public username?: string;
  public password?: string;
  public url?: IMongoUrl;
  public replicas?: IMongoUrl[];
  public database?: string;
  public options?: URLSearchParams;
  constructor(
    username?: string,
    password?: string,
    url?: IMongoUrl,
    replicas?: IMongoUrl[],
    database?: string,
    options?: URLSearchParams,
  ) {
    this.username = username;
    this.password = password;
    this.url = url;
    this.replicas = replicas;
    this.database = database;
    this.options = options;
  }
}
