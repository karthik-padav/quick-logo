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
