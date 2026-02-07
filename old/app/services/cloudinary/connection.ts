import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Check if required environment variables are present
interface Preset {
  name: string;
  categories: string;
  folder: string;
}

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function uploadProfileImages(filePath: string, id: string) {
  console.log("Uploading image");
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      public_id: id,
      overwrite: true,
      upload_preset: "hckerson",
    });
    return result;
  } catch (error) {
    console.error(`Error uploading image: ${error}`);
    throw error;
  }
}

export async function setUploadPreset(payload: Preset) {
  const { name, categories, folder } = payload;
  try {
    const response = await cloudinary.api.create_upload_preset({
      name: name,
      unsigned: false,
      tags: categories,
      folder: folder,
      // transformation: [
      //   {
      //     quality: "auto",
      //   },
      // ],
    });
    console.log("Upload preset created:", response);
    return response;
  } catch (error) {
    console.error(`Error setting preset: ${error}`);
    throw error;
  }
}

export async function generateUrlWithTransformations(publicId: string) {
  console.log(`Generating optimized url`);
  try {
    const response = cloudinary.url(publicId, {
      quality: "auto",
      fetch_format: "auto",
    });
    console.log(response);
  } catch (error) {
    console.error(`Error generating url`);
  }
}


export default cloudinary;
