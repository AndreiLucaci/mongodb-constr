import { ConnectionStringSettings } from '../models/ConnectionStringSettings';
import { IConnectionStringSettings } from '../models/IConnectionStringSettings';
import { IMongoUrl } from '../models/IMongoUrl';
import { MongoUrl } from '../models/MongoUrl';
import { ConnectionStringBuilderBase } from './ConnectionStringBuilderBase';
import { IConnectionStringBuilder } from './IConnectionStringBuilder';

export class ConnectionStringBuilder36 extends ConnectionStringBuilderBase {
  protected mongodb: string = 'mongodb+srv://';
  constructor(
    settings: IConnectionStringSettings = new ConnectionStringSettings(),
  ) {
    super(settings);
  }

  public withUrl(url: IMongoUrl): IConnectionStringBuilder {
    const mongoUrl = url instanceof MongoUrl ? url : new MongoUrl(url.host);
    this.settings.url = mongoUrl;

    return this;
  }

  public withReplicas(urls: IMongoUrl[]): IConnectionStringBuilder {
    // pass, don't need replicas

    return this;
  }

  protected buildUrl(): string {
    let val = '';

    if (this.settings.url) {
      val += `${this.settings.url.toString(false)}`;
    }

    return val;
  }

  protected buildReplicas(): string {
    // pass, we don't need to build replicas

    return '';
  }
}
