"use server";

import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function findUser({
  name,
  email,
  image,
}: {
  name: string;
  image: string;
  email: string;
}) {
  try {
    await connectToDB();
    await User.findOneAndUpdate(
      { email },
      { name, email, image },
      { upsert: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to create/update: ${error.message}`);
  }
}

export async function getUserCount(): Promise<number> {
  try {
    await connectToDB();
    return await User.countDocuments({});
  } catch (error) {
    console.error("Error fetching SVG:", error);
    throw error;
  }
}

// .populate({
//   path: "communities",
//   model: Community,
// })
