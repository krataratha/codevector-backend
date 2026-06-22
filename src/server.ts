import express from "express";
import cors from "cors";

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
}

import productsRoute from "./routes/products";
import { uptime } from "node:process";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send(
        "CodeVector Backend Running"
    );
});

app.get("/health", (_, res) => {
    res.json({
        status: "ok",
        uptime: process.uptime(),
    });
}
);

app.use("/products", productsRoute);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});