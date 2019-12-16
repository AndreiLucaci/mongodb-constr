import { IMongoUrl } from './IMongoUrl';

export class MongoUrl implements IMongoUrl {
  public host: string = '';
  public port: number = 27017;
  constructor(host: string, port: number = 27017) {
    this.host = host;
    this.port = port;
  }
  public toString() {
    let value = this.host;
    if (this.port) {
      value += `:${this.port}`;
    }
    return value;
  }
  public equals(obj: IMongoUrl): boolean {
    return (
      obj &&
      obj instanceof MongoUrl &&
      obj.host === this.host &&
      obj.port === this.port
    );
  }
}
