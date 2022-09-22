import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL || "";

export const main = async () => {
    mongoose.Promise = Promise;
    try {
        return await mongoose.connect(MONGO_URL).then(() => {
            console.log("Database Connected!");
        });
    } catch (err) {
        console.log(err);
    }
};

main().catch((err) => console.error(err));

import { Capa } from "./capa";
import { Finding } from "./finding";

const db = {
    Capa,
    Finding,
};

export default db;
