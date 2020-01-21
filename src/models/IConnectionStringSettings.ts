import { IMongoUrl } from './IMongoUrl';
export interface IConnectionStringSettings {
  username?: string;
  password?: string;
  url?: IMongoUrl;
  replicas?: IMongoUrl[];
  database?: string;
  options?: URLSearchParams;
}
