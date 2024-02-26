import { v2 as cloudinary } from "cloudinary";

export default async function handler(req, res) {
  const { paramsToSign } = req.body;

  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );
    res.status(200).json({
      signature,
    });
  } catch (error) {
    res.status(500).json({
      error: e.message,
    });
  }
}
