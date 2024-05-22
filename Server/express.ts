import express, { Request, Response } from "express";
import request from "request";
import { URLSearchParams } from "url";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  console.log(req.body);

  next();
});

app.use("/proxy", (req: Request, res: Response) => {
  const url = req.query.url as string | undefined;
  const apiKey = req.query.apiKey as string | undefined;

  if (!url || !apiKey) {
    return res
      .status(400)
      .json({ error: "URL and apiKey parameters are required" });
  }
  const validUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!validUrlRegex.test(url)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }
  const urlObject = new URL(url);
  urlObject.searchParams.append("apiKey", apiKey);

  req.pipe(request(urlObject.toString())).pipe(res);
});

app.listen(8080, () => {
  console.log("CORS proxy running on port 8080");
});
