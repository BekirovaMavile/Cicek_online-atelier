import express, { Router } from "express";
import serverless from "serverless-http";
import router from "../../routes";

const api = express();

api.use("/.netlify/functions/", router);

export const handler = serverless(api);