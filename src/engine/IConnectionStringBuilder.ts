import { IConnectionStringSettings } from '../models/IConnectionStringSettings';
import { IMongoUrl } from '../models/IMongoUrl';

export interface IConnectionStringBuilder {
  getSettings(): IConnectionStringSettings;
  withOptions(options: any): IConnectionStringBuilder;
  withCredentials(username: string, password: string): IConnectionStringBuilder;
  withUrl(url: IMongoUrl): IConnectionStringBuilder;
  withReplicas(urls: IMongoUrl[]): IConnectionStringBuilder;
  withDatabase(database: string): IConnectionStringBuilder;
  build(): string;
}
