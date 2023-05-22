import nc, { createRouter } from 'next-connect';
import connectDB from '../../../Backend/config/dbConnect';
import { generateUploadURL } from '../../../Backend/s3';

// const handler = nc();
const router = createRouter();

router.get(async (req, res) => {
  try {
    const url = await generateUploadURL();

    return res.send({ url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Check if name, email or password is provided

export default connectDB(router);
