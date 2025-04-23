const express = require("express");

const { routes } = require("./routes/routes");

const { connectToMongoDB } = require("./db_connections/mongo");

const app = express();

app.use(express.json())

const port = process.env.PORT || "3000";

const mongo_connection_url = process.env.MONGO_CONNECTION_URL || "mongodb://127.0.0.1:27017/";

const mongo_database_name = process.env.MONGO_DATABASE_NAME || "mylocaldb";

routes(app)

connectToMongoDB(mongo_connection_url + mongo_database_name)
  .then(() => console.log("MongoDB connected successfuly"))
  .catch((err) => console.error("Error in mongodb connection ", err));

app.listen(port, () => console.log("App is listening on port: ", port));
