import { v2 as cloudinary } from "cloudinary";

// Only sign what the docs demos' uploads need. Anything else (public_id,
// overwrite, type, notification_url, etc.) would let callers sign
// non-upload requests such as deletes, so reject it.
const ALLOWED_PARAMS = ['timestamp', 'source', 'upload_preset'];
const UPLOAD_PRESET = 'next-cloudinary-signed';

export default async function handler(req, res) {
  const { paramsToSign } = req.body || {};

  if (
    !paramsToSign ||
    typeof paramsToSign !== 'object' ||
    Object.keys(paramsToSign).some((key) => !ALLOWED_PARAMS.includes(key)) ||
    paramsToSign.upload_preset !== UPLOAD_PRESET
  ) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

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
      error: error.message,
    });
  }
}
