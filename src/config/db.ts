import mongoose from 'mongoose'
import 'dotenv/config'

const URI = process.env.ATLAS_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const dbConnect = () =>
    // @ts-ignore
    mongoose.connect(URI, options);

export {dbConnect}