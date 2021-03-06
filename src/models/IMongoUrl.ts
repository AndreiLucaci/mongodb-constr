export interface IMongoUrl {
  host: string;
  port: number;
  equals(obj: IMongoUrl): boolean;
  toString(usePort: boolean): string;
}
