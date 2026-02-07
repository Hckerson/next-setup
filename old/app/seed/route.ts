import path from "node:path";
import { uploadProfileImages } from "../services/cloudinary/connection";
import { setUploadPreset } from "../services/cloudinary/connection";
import { generateUrlWithTransformations } from "../services/cloudinary/connection";

async function uploadProfile() {
  console.log(`Uploading`);
  const file_path = path.join(process.cwd(), "public/hckerson.png");
  const response = await uploadProfileImages(file_path, 'hckerson');
  const {secure_url} = response
  console.log(secure_url)
}



async function setPreset() {
  console.log(`Setting preset`)
  const preset = {
    name: 'hckerson',
    categories: 'me, hckerson',
    folder: 'profile',
  }
  await setUploadPreset(preset)
}


export async function GET() {
  try {
    // await uploadProfile();
    // await setPreset()
    // await generateUrlWithTransformations('profile/hckerson')

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
