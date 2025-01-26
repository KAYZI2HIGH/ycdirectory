'use server'

import slugify from "react-slugify";

import { writeClient } from "./write-client"; // Path to your Sanity client configuration
import cloudinary from "../../../cloudinary"; // Path to your Cloudinary configuration
import { auth } from "../../../auth";

export const addPitchAction = async (formData) => {
  "use server";

  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const image = formData.get("image"); // Single image input
  const pitch = formData.get("pitch");
  const slug = slugify(title, {lower: true, strict: true})

  // const file = image && image[0];

  // console.log(file)

  try {
    let imageUrl = null;

    // 🖼️ Handle Single Image Upload
    if (image) {
      const buffer = await image.arrayBuffer();
      const base64Image = `data:${image.type};base64,${Buffer.from(
        buffer
      ).toString("base64")}`;

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        public_id: `${Date.now()}-${image.name.replace(/\s+/g, "-")}`,
        resource_type: "auto",
      });

      // Store the uploaded image URL
      imageUrl = uploadResponse.secure_url;
    }

    const session = await auth()

    // Prepare Sanity Document
    const newPitch = {
      title,
      slug: {
        _type: slug,
        current: slug
      },
      author: {
      _type: "reference",
      _ref: session?.id
    },
      description,
      category,
      views: 0,
      pitch, // Save multiple pitch-related inputs
      image: imageUrl || '', // Store image URL if available
    };

    // Add the document to Sanity
    const post = await writeClient.create({_type: "startup", ...newPitch});
    console.log("Pitch added to Sanity successfully!");

    return { success: "Pitch listed successfully with image.", info: post };
  } catch (error) {
    console.error("Failed to save pitch with image:", error);
    return { error: "Something went wrong!" };
  }
};
