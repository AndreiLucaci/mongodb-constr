import { IConnectionStringSettings } from './models/IConnectionStringSettings';
import { ConnectionStringBuilder34 } from './engine/ConnectionStringBuilder34';
import { ConnectionStringBuilder36 } from './engine/ConnectionStringBuilder36';
import { IConnectionStringBuilder } from './engine/IConnectionStringBuilder';

export enum MongoDbVersion {
  VERSION_34 = 'VERSION_34',
  VERSION_36 = 'VERSION_36',
}

const MongoConnectionStringBuilder = (
  version: MongoDbVersion = MongoDbVersion.VERSION_36,
): IConnectionStringBuilder => {
  const builder =
    version === MongoDbVersion.VERSION_34
      ? new ConnectionStringBuilder34()
      : new ConnectionStringBuilder36();

  return builder;
};

const MongoConnectionString = (
  settings: IConnectionStringSettings,
  version: MongoDbVersion = MongoDbVersion.VERSION_36,
): string => {
  const builder =
    version === MongoDbVersion.VERSION_34
      ? new ConnectionStringBuilder34(settings)
      : new ConnectionStringBuilder36(settings);

  return builder.build();
};

export const MongoConStr = {
  create: (
    settings: IConnectionStringSettings,
    version: MongoDbVersion = MongoDbVersion.VERSION_36,
  ): string => MongoConnectionString(settings, version),
  builder: (
    version: MongoDbVersion = MongoDbVersion.VERSION_36,
  ): IConnectionStringBuilder => MongoConnectionStringBuilder(version),
};
