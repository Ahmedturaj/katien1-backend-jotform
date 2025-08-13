import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";

async function main() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Database connected.....");

    app.listen(config.PORT, () => {
      console.log(`Server running on port http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
