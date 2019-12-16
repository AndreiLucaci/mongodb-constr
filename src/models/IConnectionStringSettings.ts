import { IMongoUrl } from './IMongoUrl';
export interface IConnectionStringSettings {
  username: string | undefined;
  password: string | undefined;
  url: IMongoUrl | undefined;
  replicas: IMongoUrl[] | undefined;
  database: string | undefined;
  options: URLSearchParams | undefined;
}
