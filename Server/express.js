"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    console.log(req.body);
    next();
});
app.use("/proxy", (req, res) => {
    const url = req.query.url;
    const apiKey = req.query.apiKey;
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
    req.pipe((0, request_1.default)(urlObject.toString())).pipe(res);
});
app.listen(8080, () => {
    console.log("CORS proxy running on port 8080");
});
