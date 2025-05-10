import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end('Method Not Allowed');
  try {
    const result = await cloudinary.uploader.destroy(req.body.publicId);
    res.status(200).json({ success: result.result === 'ok' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
