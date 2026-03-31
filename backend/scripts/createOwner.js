import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createOwner = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(process.env.OWNER_PASS, 10);
    const findOwner = await User.findOne({role: 'owner'});

    if (findOwner) {
        return console.log("This action can not be done! Owner already created");
    }
    const user = await User.create({
      username: "owner",
      email: process.env.OWNER_EMAIL,
      password: hashedPassword,
      role: "owner",
    });

    console.log("Owner created:", user.email);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createOwner();