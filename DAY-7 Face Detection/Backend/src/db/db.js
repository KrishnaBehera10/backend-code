import mongoose from "mongoose";

const connectmongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("mongoosedb connection successfully");
  } catch (error) {
    console.log(`mongoosedb connection error ${error}`);
  }
};

export default connectmongoose;
