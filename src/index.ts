import express, { Request, Response } from "express";
import { Logger } from "./logger";

const app = express();
const port = process.env.PORT || 3000;
const logger = new Logger();

app.get("/health", (req: Request, res: Response) => {
  //   console.log(os.platform());
  logger.info("hello from Logger", true);
  res.status(200).end("hello server");
});

app.listen(port, () => {
  console.log(`Server started at PORT ${port} ...`);
});
