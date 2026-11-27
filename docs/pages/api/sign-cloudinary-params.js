import { v2 as cloudinary } from "cloudinary";

// Only sign what the docs demos' uploads need. Anything else (public_id,
// overwrite, type, notification_url, etc.) would let callers sign
// non-upload requests such as deletes, so reject it.
const ALLOWED_PARAMS = ['timestamp', 'source', 'upload_preset'];
const UPLOAD_PRESET = 'next-cloudinary-signed';

// Cloudinary rejects timestamps more than an hour old but accepts any future
// one, so a far-future timestamp would make a signature usable for much longer
// than intended. Only sign timestamps close to the server's clock.
const TIMESTAMP_WINDOW_SECONDS = 5 * 60;

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

  // Older Cloudinary signature versions join name=value pairs with & without
  // escaping them, so a value containing & or = could add a parameter that
  // was never checked above.
  const hasUnsafeValue = Object.values(paramsToSign).some((value) => {
    if (typeof value === 'number') return false;
    if (typeof value !== 'string') return true;
    return /[&=]/.test(value);
  });

  if (hasUnsafeValue) {
    return res.status(400).json({ error: 'Invalid parameter value' });
  }

  const { timestamp } = paramsToSign;
  const now = Math.floor(Date.now() / 1000);

  if (
    typeof timestamp !== 'number' ||
    !Number.isFinite(timestamp) ||
    Math.abs(now - timestamp) > TIMESTAMP_WINDOW_SECONDS
  ) {
    return res.status(400).json({ error: 'Invalid timestamp' });
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
