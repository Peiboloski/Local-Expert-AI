import * as winston from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import { allColors } from 'winston/lib/winston/config';

// Create a Logtail client
//@ts-ignore
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);


const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
let transports = [];

switch (environment) {
  case 'production': {
    transports = [
      //@ts-ignore
      new LogtailTransport(logtail)
    ]
    break;
  }
  default: {
    transports = [
      new winston.transports.File({ filename: 'app.log' }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.prettyPrint(),
        ),
      })
    ]
    break;
  }
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: transports
});

export default logger;