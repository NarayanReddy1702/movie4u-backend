import mongoose from "mongoose";

async function DBconnection() {
  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URL + process.env.NAME_OF_PROJECT
    );
    console.log("DB connection successful:", db.connection.name);
  } catch (error) {
    console.error("DBconnection Error:", error.message);
  }
}

export default DBconnection;
