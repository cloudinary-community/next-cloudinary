import { v2 as cloudinary } from "cloudinary";

export default async function handler(req, res) {
  // Validate HTTP method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // TODO: Add authentication check here
  // Example: Verify user session, JWT token, or API key
  // const session = await getSession(req);
  // if (!session || !session.user) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  const { paramsToSign } = req.body;

  // Validate input
  if (!paramsToSign || typeof paramsToSign !== 'object') {
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
    console.error('Cloudinary signature error:', error);
    res.status(500).json({
      error: 'Failed to generate upload signature',
    });
  }
}
