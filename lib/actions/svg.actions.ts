"use server";

import Svg from "../models/svg.model";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";

interface Params {
  svg: string;
  filename: string;
}

export async function updateSVG({
  svg,
  filename,
  key,
}: {
  svg: string | undefined;
  filename: string;
  key: string;
}) {
  try {
    await connectToDB();
    const _svg = await Svg.findOneAndUpdate(
      { svg_id: key },
      { filename, svg },
      { upsert: true, returnDocument: "after" }
    );
    console.log(_svg?._id, "_svg123");
    // await User.findByIdAndUpdate(author, {
    //   $push: { threads: createdThread._id },
    // });
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
