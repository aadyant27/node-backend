// TODO: Include Time stamps in Logs too.
// TODO: Implement Slackbot

import * as winston from "winston";
import * as dotenv from "dotenv";
import * as os from "os";

dotenv.config();

export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || "info",
      format:
        process.env.NODE_ENV !== "production"
          ? winston.format.cli()
          : winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }

  info(data: string, notify?: boolean): void {
    let log: LOG = { message: data };
    log.host = os.platform();
    this.logger.info(log);

    if (notify) {
      this.notify("info");
    }
  }
  warn(data: string, notify?: boolean) {
    let log: LOG = { message: data };
    log.host = os.platform();
    this.logger.warn(log);

    if (notify) {
      this.notify("warn");
    }
  }

  //TODO: Creation of Error Object, if error instanceof Error.
  error(data: string, notify?: boolean) {
    let log: LOG = { message: data };
    log.host = os.platform();
    this.logger.error(log);
    if (notify) {
      this.notify("error");
    }
  }

  //TODO: Better implementation of debug
  debug(data: string, notify?: boolean) {
    let log: LOG = { message: data };
    log.host = os.platform();
    this.logger.debug(log);

    if (notify) {
      this.notify("debug");
    }
  }

  notify(type: "info" | "warn" | "error" | "debug") {
    //Used to trigger a slackbot
    this.logger.warn(
      `Type:${type}:: Slack bot triggered. **NOT YET IMPLEMENTED**`
    );
  }
}

interface LOG {
  // TODO: Time stamps
  message: string;
  host?: string;
}
