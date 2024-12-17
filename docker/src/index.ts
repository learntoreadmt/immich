import { buildYaml, GeneratorOptions } from 'lib/index.ts';

console.log(process.env.PATH);

const main = () => {
  const commonOptions = {
    baseLocation: '/home/immich',
    releaseVersion: 'v1.122.0',
    healthchecks: true,
    machineLearning: true,
    // hardwareAcceleration: 'nvenc',
  };

  const defaultOptions: GeneratorOptions = {
    ...commonOptions,
    databaseName: 'immich',
    databaseUser: 'postgres',
    databasePassword: 'postgres',
    databaseLocation: '/home/immich/database',
  };

  const splitStorageOptions: GeneratorOptions = {
    ...defaultOptions,
    thumbnailsLocation: '/home/fast/thumbs',
    encodedVideoLocation: '/home/fast/encoded-videos',
  };

  const noHealthchecks: GeneratorOptions = {
    ...defaultOptions,
    healthchecks: false,
  };

  const externalOptions: GeneratorOptions = {
    ...commonOptions,
    externalDatabaseUrl: 'postgres://immich:immich@localhost:5432/immich',
    databaseVectorExtension: 'pgvector',
    externalRedisUrl: 'redis://database:6379/0',
  };

  const options = [defaultOptions, splitStorageOptions, noHealthchecks, externalOptions];

  // TODO replace with vitest test files/scripts
  for (const option of options) {
    const spec = buildYaml(option);
    console.log(spec);
  }
};

main();

// get.immich.app/install?hardware-acceleration=nvenc&api-port=2283&vector-extension=pgvector&data=/data&thumbs=/thumbs&release-version=1.122.0&database-user=admin&database-password=admin&database-name=immich&no-healthchecks
