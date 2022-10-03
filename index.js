import request from "request";
import express from "express";
import "dotenv/config";
import fs from "fs";

const app = express();

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

var allowCrossDomain = function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");

	next();
};
app.use(allowCrossDomain);

app.get("/", async (req, res) => {
	const data = await new Promise((resolve) =>
		fs.readFile("./wl.json", "utf8", (err, data) => resolve(data))
	);
	res.send(data);
});

const PORT = process.env.PORT || 8092;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log("Press Ctrl+C to quit.");
});
