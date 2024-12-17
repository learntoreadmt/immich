import {
  DatabaseOptions,
  ExternalDatabaseOptions,
  ExternalRedisOptions,
  GeneratorOptions,
  RedisOptions,
} from 'lib/types';

export const isExternalDatabase = (options: DatabaseOptions): options is ExternalDatabaseOptions =>
  'externalDatabaseUrl' in options;

export const isExternalRedis = (options: RedisOptions): options is ExternalRedisOptions =>
  'externalRedisUrl' in options;

export const asQueryParams = (values: Record<string, string | number | boolean | undefined>) => {
  return new URLSearchParams(
    Object.entries(values)
      .filter(Boolean)
      .map(([key, value]) => [key, String(value)]),
  ).toString();
};

export const getImmichVolumes = (options: GeneratorOptions) => {
  const {
    baseLocation,
    encodedVideoLocation,
    uploadLocation,
    backupsLocation,
    profileLocation,
    libraryLocation,
    thumbnailsLocation,
  } = options;

  const internalBaseLocation = '/usr/src/app/upload';

  const volumes = [`${baseLocation}:${internalBaseLocation}`];

  for (const { override, folder } of [
    { override: encodedVideoLocation, folder: 'encoded-video' },
    { override: libraryLocation, folder: 'library' },
    { override: uploadLocation, folder: 'upload' },
    { override: profileLocation, folder: 'profile' },
    { override: thumbnailsLocation, folder: 'thumbs' },
    { override: backupsLocation, folder: 'backups' },
  ]) {
    if (override) {
      volumes.push(`${override}:${internalBaseLocation}/${folder}`);
    }
  }

  volumes.push(`/etc/localtime:/etc/localtime:ro`);

  return volumes;
};

export const getImmichEnvironment = (options: GeneratorOptions) => {
  const env: Record<string, string | number | undefined> = {};
  if (isExternalDatabase(options)) {
    env.DB_URL = options.externalDatabaseUrl;
    env.DB_VECTOR_EXTENSION = options.databaseVectorExtension;
  } else {
    const { databaseUser, databasePassword, databaseName } = options;
    env.DB_URL = `postgres://${databaseUser}:${databasePassword}@database:5432/${databaseName}`;
  }

  if (isExternalRedis(options)) {
    env.REDIS_URL = options.externalRedisUrl;
  } else {
    env.REDIS_HOSTNAME = options.redisHost;
    env.REDIS_PORT = options.redisPort;
    env.REDIS_DBINDEX = options.redisDbIndex;
    env.REDIS_USERNAME = options.redisUsername;
    env.REDIS_PASSWORD = options.redisPassword;
    env.REDIS_SOCKET = options.redisSocket;
  }

  return env;
};
