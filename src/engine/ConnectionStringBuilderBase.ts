import { Objs } from 'minobjs';
import { IMongoUrl } from '../models/IMongoUrl';
import { MongoUrl } from '../models/MongoUrl';
import { IConnectionStringSettings } from '../models/IConnectionStringSettings';
import { ConnectionStringSettings } from '../models/ConnectionStringSettings';
import { IConnectionStringBuilder } from './IConnectionStringBuilder';

export abstract class ConnectionStringBuilderBase
  implements IConnectionStringBuilder {
  abstract mongodb: string;
  protected settings: IConnectionStringSettings;

  constructor(
    settings: IConnectionStringSettings = new ConnectionStringSettings(),
  ) {
    this.settings = settings;

    if (this.settings.url && !(this.settings.url instanceof MongoUrl)) {
      this.settings.url = new MongoUrl(
        this.settings.url.host,
        this.settings.url.port,
      );
    }

    if (
      this.settings.options &&
      !(this.settings.options instanceof URLSearchParams)
    ) {
      this.settings.options = new URLSearchParams(this.settings.options);
    }
  }

  public getSettings(): IConnectionStringSettings {
    return this.settings;
  }

  public withOptions(options: any): IConnectionStringBuilder {
    if (options && !new Objs().isEmpty(options)) {
      this.settings.options = new URLSearchParams();
      for (let key of Object.keys(options)) {
        this.settings.options.append(key, options[key]);
      }
    }

    return this;
  }

  public withCredentials(
    username: string,
    password: string = '',
  ): IConnectionStringBuilder {
    this.settings.username = username || '';
    this.settings.password = password || '';

    return this;
  }

  public abstract withUrl(url: IMongoUrl): IConnectionStringBuilder;

  public abstract withReplicas(urls: IMongoUrl[]): IConnectionStringBuilder;

  public withDatabase(database: string): IConnectionStringBuilder {
    this.settings.database = database || '';

    return this;
  }

  protected buildMongoDb(): string {
    return this.mongodb;
  }

  protected buildCredentials(): string {
    let val = '';

    if (this.settings.username) {
      val += `${this.settings.username}${this.settings.password ? ':' : '@'}`;
    }

    if (this.settings.password) {
      val += `${this.settings.password}@`;
    }

    return val;
  }

  protected abstract buildUrl(): string;

  protected abstract buildReplicas(): string;

  protected buildDatabase(): string {
    let val = '';

    if (this.settings.database) {
      val += `/${this.settings.database}`;
    }

    return val;
  }

  protected buildOptions(): string {
    let val = '';

    if (this.settings.options) {
      val += `?${this.settings.options.toString()}`;
    }

    return val;
  }

  public build(): string {
    let val = this.buildMongoDb();

    val += this.buildCredentials();

    val += this.buildUrl();

    val += this.buildReplicas();

    val += this.buildDatabase();

    val += this.buildOptions();

    return val;
  }
}
