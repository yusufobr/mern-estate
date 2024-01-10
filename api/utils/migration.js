import mongoose from "mongoose";
import Listing from "../models/listing.model.js";

// Connect to your MongoDB database
mongoose
  .connect(process.env.MONGOO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Your migration script
async function migrateUserRefs() {
  try {
    // Find all listings with userRef as string
    const listings = await Listing.find({ userRef: { $type: "string" } });

    // Update each listing to convert userRef to ObjectId
    for (const listing of listings) {
      const mongoObj = new mongoose.Types.ObjectId(listing.userRef);
      listing.userRef = mongoObj;
      await listing.save();
    }

    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    mongoose.disconnect(); // Close the database connection
  }
}

// Execute the migration
migrateUserRefs();
