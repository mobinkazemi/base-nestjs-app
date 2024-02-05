export const defaults = {
  // Application name & port & file upload size
  appName: 'NESTJS-APP',
  port: 3000,
  logger: true,
  checkRoleForEndpoints: true,

  // Application super admin
  superAdminDefaultUsername: 'super_admin',
  superAdminDefaultPassword: '12345678', //

  // JWT
  jwtSecret: 'DUMMY_SECRET', //
  accessJwtExpire: '7d',
  refreshJwtExpire: '30d',

  // FILE MANAGEMENT
  file: {
    maxUploadSize: 1024 * 1024 * 5, // 5 Megabytes
    maxCacherSize: 1024 * 1024 * 1, // 1 Megabyte
    cacherTTL: 60 * 30, // 30 Minutes
  },
  // Main DB
  database: {
    requiredAuth: false,
    timeout: 500,
    port: 27017,
    host: 'localhost',
    name: 'NESTJS-APP',
    username: 'root',
    password: '12345678',
  },

  // Cache DB
  redis: {
    auth: false,
    port: 6379,
    host: 'localhost',
    name: 'NESTJS-APP',
    password: 'redis-password',
  },

  // Object Storage DB
  minio: {
    port: 9000,
    host: 'localhost',
    bucket: 'minio-default-bucket',
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  },

  // Client target (CORS)
  client: {
    uri: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
  },
};
