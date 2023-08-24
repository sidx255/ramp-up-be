require('dotenv').config();

module.exports =
{
  'development': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'dialect': process.env.DB_DIALECT,
    'dialectOptions': {
      useUTC: false,
    },
    'timezone': process.env.DB_TIMEZONE,
  },
  'test': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'dialect': process.env.DB_DIALECT,
    'dialectOptions': {
      useUTC: false,
    },
    'timezone': process.env.DB_TIMEZONE,
  },
  'production': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'dialect': process.env.DB_DIALECT,
    'dialectOptions': {
      useUTC: false,
    },
    'timezone': process.env.DB_TIMEZONE,
  }
};
