import mongoose from "mongoose";
import config from '../config/index';

export const connect = (url = config.dbUrl) => {
    return mongoose.connect(url, {useNewUrlParser: true})
}