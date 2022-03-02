import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.ATLAS_URI;

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("connected", (error) => {
  if (error) {
    console.log("Mongo db has an error ", error);
  }
  console.log("Mongo db is connected");
});

db.on("error", (error) => {
  console.log("Mongo db has an error ", error);
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: "true",
};

const dbConnect = () =>
  // @ts-ignore
  mongoose.connect(URI, options);

export { dbConnect };
