export const appConfig = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    apiPrefix: '/api/v1',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    jwt: {
      secret: process.env.JWT_SECRET || 'secret-key',
      refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    },
    db: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ts-express-starter'
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD
    },
    i18n: {
      defaultLocale: 'en',
      availableLocales: ['en', 'bn']
    }
  };