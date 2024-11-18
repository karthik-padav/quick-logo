"use server";

import { ObjectId } from "mongodb";
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
  email,
  source,
}: {
  svg: string | undefined;
  filename: string;
  key: string;
  email: string;
  source: string;
}) {
  try {
    await connectToDB();
    const _svg = await Svg.findOneAndUpdate(
      { svg_id: key },
      { filename, svg, source },
      { upsert: true, returnDocument: "after" }
    );
    if (email) {
      await User.findOneAndUpdate(
        { email },
        { $addToSet: { svgs: _svg._id } },
        { new: true }
      );
    }
  } catch (error: any) {
    console.log(error.message, "error.message");
    throw new Error(`Failed to create/update: ${error.message}`);
  }
}

export async function fetchSvg({
  filename,
  svgIds,
}: {
  filename?: string | null;
  svgIds?: Array<string>;
}) {
  try {
    await connectToDB();
    let filter: { [key: string]: any } = {};
    if (filename) filter["filename"] = filename;
    if (svgIds?.length)
      filter["_id"] = { $in: svgIds.map((i) => new ObjectId(i)) };
    return await Svg.find(filter);
  } catch (error) {
    console.error("Error fetching SVG:", error);
    throw error;
  }
}

export async function getSvgCount(): Promise<number> {
  try {
    await connectToDB();
    return await Svg.countDocuments({});
  } catch (error) {
    console.error("Error fetching SVG:", error);
    throw error;
  }
}
