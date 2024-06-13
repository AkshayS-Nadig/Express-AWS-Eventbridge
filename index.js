import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { triggerEvent } from "./resources/aws-eventbridge.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/webhook", async (req, res, next) => {
	const event = req.body.event;
	const resp = await triggerEvent(event);

	if (!resp.success) res.status(400).json(resp);
	else res.status(200).json(resp);
});

app.get("/", (req, res, next) => {
	res.status(200).json({ message: "Hi from API" });
});

app.listen(5001, () => console.log("Listening on 5001"));
