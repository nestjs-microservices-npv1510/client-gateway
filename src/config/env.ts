import { config } from 'dotenv';
config();
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  // Product microservice
  PRODUCT_MICROSERVICE_HOST: string;
  PRODUCT_MICROSERVICE_PORT: number;

  // Order microservice
  ORDER_MICROSERVICE_HOST: string;
  ORDER_MICROSERVICE_PORT: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().default(4000),

    PRODUCT_MICROSERVICE_HOST: joi.string().required(),
    PRODUCT_MICROSERVICE_PORT: joi.number().required(),

    ORDER_MICROSERVICE_HOST: joi.string().required(),
    ORDER_MICROSERVICE_PORT: joi.number().required(),

    // DATABASE_URL: joi.string().required(),
    // JWT_SECRET: joi.string().required(),
    // SESSION_SECRET: joi.string().required(),
  })
  .unknown(true);

// console.log('FROM ENVS: ');
// console.log(process.env);
const { error, value } = envSchema.validate(process.env);
// console.log(value);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const {
  PORT,
  PRODUCT_MICROSERVICE_HOST,
  PRODUCT_MICROSERVICE_PORT,
  ORDER_MICROSERVICE_HOST,
  ORDER_MICROSERVICE_PORT,
} = envVars;
