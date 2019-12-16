import { Objs } from 'minobjs';
import { IMongoUrl } from './models/IMongoUrl';
import { MongoUrl } from './models/MongoUrl';
import { IConnectionStringSettings } from './models/IConnectionStringSettings';
import { ConnectionStringSettings } from './models/ConnectionStringSettings';

export class ConnectionStringBuilder {
  private mongodb: string = 'mongodb://';
  private settings: IConnectionStringSettings;

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
      Array.isArray(this.settings.replicas) &&
      this.settings.replicas.length
    ) {
      this.settings.replicas = this.settings.replicas.map(x => {
        return x instanceof MongoUrl ? x : new MongoUrl(x.host, x.port);
      });
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

  public withOptions(options: any): ConnectionStringBuilder {
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
  ): ConnectionStringBuilder {
    this.settings.username = username || '';
    this.settings.password = password || '';

    return this;
  }

  public withUrl(url: IMongoUrl): ConnectionStringBuilder {
    const mongoUrl =
      url instanceof MongoUrl ? url : new MongoUrl(url.host, url.port);
    this.settings.url = mongoUrl;

    return this;
  }

  public withReplicas(urls: IMongoUrl[]): ConnectionStringBuilder {
    if (Array.isArray(urls) && urls.length) {
      if (!Array.isArray(this.settings.replicas)) {
        this.settings.replicas = [];
      }

      urls.map(x => {
        const host = x instanceof MongoUrl ? x : new MongoUrl(x.host, x.port);

        if (!this.settings.replicas!.some(y => y && y.equals(host))) {
          this.settings.replicas!.push(host);
        }
      });
    }

    return this;
  }

  public withDatabase(database: string): ConnectionStringBuilder {
    this.settings.database = database || '';

    return this;
  }

  public build(): string {
    let val = this.mongodb;

    if (this.settings.username) {
      val += `${this.settings.username}${this.settings.password ? '' : '@'}`;
    }

    if (this.settings.password) {
      val += `${this.settings.password}@`;
    }

    if (this.settings.url) {
      val += `${this.settings.url}`;
    }

    if (this.settings.replicas && this.settings.replicas.length) {
      val += `${this.settings.url ? ',' : ''}${this.settings.replicas
        .filter(x => x)
        .join(',')}`;
    }

    if (this.settings.database) {
      val += `/${this.settings.database}`;
    }

    if (this.settings.options) {
      val += `?${this.settings.options.toString()}`;
    }

    return val;
  }
}

export const MongoConnectionStringBuilder = (): ConnectionStringBuilder => {
  const builder = new ConnectionStringBuilder();

  return builder;
};

export const MongoConnectionString = (
  settings: IConnectionStringSettings,
): string => {
  const builder = new ConnectionStringBuilder(settings);

  return builder.build();
};
