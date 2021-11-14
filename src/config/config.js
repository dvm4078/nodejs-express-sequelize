import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(4567),
    DB_USERNAME: Joi.string().required().description('DB username'),
    // DB_PASSWORD: Joi.string(),
    DB_NAME: Joi.string().required().description('DB name'),
    DB_HOSTNAME: Joi.string().required().description('DB hostname'),
    DB_DIALECT: Joi.string().required().description('DB dialect'),
    DB_PORT: Joi.string().required().description('DB port'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    database: envVars.DB_NAME,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    options: {
      host: envVars.DB_HOSTNAME,
      dialect: envVars.DB_DIALECT,
    },
  },
};
