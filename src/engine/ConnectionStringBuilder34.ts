import { ConnectionStringSettings } from '../models/ConnectionStringSettings';
import { IConnectionStringSettings } from '../models/IConnectionStringSettings';
import { IMongoUrl } from '../models/IMongoUrl';
import { MongoUrl } from '../models/MongoUrl';
import { ConnectionStringBuilderBase } from './ConnectionStringBuilderBase';
import { IConnectionStringBuilder } from './IConnectionStringBuilder';

export class ConnectionStringBuilder34 extends ConnectionStringBuilderBase {
  protected mongodb: string = 'mongodb://';
  constructor(
    settings: IConnectionStringSettings = new ConnectionStringSettings(),
  ) {
    super(settings);

    if (
      Array.isArray(this.settings.replicas) &&
      this.settings.replicas.length
    ) {
      this.settings.replicas = this.settings.replicas.map(x => {
        return x instanceof MongoUrl ? x : new MongoUrl(x.host, x.port);
      });
    }
  }

  public withUrl(url: IMongoUrl): IConnectionStringBuilder {
    const mongoUrl =
      url instanceof MongoUrl ? url : new MongoUrl(url.host, url.port);
    this.settings.url = mongoUrl;

    return this;
  }

  public withReplicas(urls: IMongoUrl[]): IConnectionStringBuilder {
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

  protected buildUrl(): string {
    let val = '';

    if (this.settings.url) {
      val += `${this.settings.url}`;
    }

    return val;
  }

  protected buildReplicas(): string {
    let val = '';

    if (this.settings.replicas && this.settings.replicas.length) {
      val += `${this.settings.url ? ',' : ''}${this.settings.replicas
        .filter(x => x)
        .join(',')}`;
    }

    return val;
  }
}
