export type BaseOptions = {
  releaseVersion: string;
  healthchecks: boolean;
  machineLearning: boolean;
};

export type GeneratorOptions = BaseOptions & FolderOptions & DatabaseOptions & RedisOptions;

export type FolderOptions = {
  baseLocation: string;
  encodedVideoLocation?: string;
  libraryLocation?: string;
  uploadLocation?: string;
  profileLocation?: string;
  thumbnailsLocation?: string;
  backupsLocation?: string;
};

export type DatabaseOptions = InternalDatabaseOptions | ExternalDatabaseOptions;
export type InternalDatabaseOptions = {
  databaseUser: string;
  databasePassword: string;
  databaseName: string;
  databaseLocation: string;
};
export type ExternalDatabaseOptions = { externalDatabaseUrl: string; databaseVectorExtension?: VectorExtension };

export type RedisOptions = InternalRedisOptions | ExternalRedisOptions;
export type InternalRedisOptions = {
  redisHost?: string;
  redisPort?: number;
  redisDbIndex?: number;
  redisUsername?: string;
  redisPassword?: string;
  redisSocket?: string;
};
export type ExternalRedisOptions = { externalRedisUrl: string };

export type VectorExtension = 'pgvector' | 'pgvecto.rs';

export type HardwareAccelerationPlatform = 'nvenc' | 'quicksync' | 'rkmpp' | 'vappi' | 'vaapi-wsl';
