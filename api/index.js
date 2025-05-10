
const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

cloudinary.config({
  cloud_name: 'drweim9cu',
  api_key: '725186238395714',
  api_secret: 'SehIXVRM_5dmVU_skizuA4Fhl8w'
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/list-images', async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('folder:dashboard AND resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();
    res.json(result.resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/delete-image', async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.body.publicId);
    res.json({ success: result.result === 'ok' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = app;
