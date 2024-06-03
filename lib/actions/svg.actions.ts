"use server";

import Svg from "../models/svg.model";

import { connectToDB } from "../mongoose";

// export async function fetchUser(userId: string) {
//   try {
//     connectToDB();

//     return await Svg.findOne({ id: userId }).populate({
//       path: "communities",
//       model: Community,
//     });
//   } catch (error: any) {
//     throw new Error(`Failed to fetch user: ${error.message}`);
//   }
// }

interface Params {
  svg: string;
  filename: string;
}

export async function updateSVG({
  svg,
  filename,
}: {
  svg: string | undefined;
  filename: string;
}) {
  try {
    await connectToDB();
    await Svg.findOneAndUpdate({ svg }, { filename }, { upsert: true });
  } catch (error: any) {
    throw new Error(`Failed to create/update: ${error.message}`);
  }
}

export async function fetchSvg({
  userId,
  icon,
}: {
  userId: string;
  icon: string;
}) {
  try {
    await connectToDB();
    const filter = { filename: "AirplayIcon" };
    return await Svg.find({});
  } catch (error) {
    console.error("Error fetching SVG:", error);
    throw error;
  }
}
