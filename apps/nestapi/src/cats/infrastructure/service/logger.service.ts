import { ConsoleLogger, Injectable } from '@nestjs/common';

import { ILogger } from '../../application/interface/spi/ilogger.service';

@Injectable()
export class ConsoleLoggerStrategy extends ILogger {
  private readonly logger = new ConsoleLogger();

  debug(context: string) {
    this.logger.debug(context);
  }
  log(context: string) {
    this.logger.log(context);
  }
  error(context: string, trace?: string) {
    this.logger.error(trace, context);
  }
  warn(context: string) {
    this.logger.warn(context);
  }
}
