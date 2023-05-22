import nc, { createRouter } from 'next-connect';
import connectDB from '../../../Backend/config/dbConnect';
import { generateUploadURL } from '../../../Backend/s3';

export default async function handler(req, res) {
  await connectDB();

  try {
    const url = await generateUploadURL();
    console.log('Uploaded');

    return res.send({ url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

// const handler = nc();
// const router = createRouter();

// router.get(async (req, res) => {
// try {
//   const url = await generateUploadURL();

//   return res.send({ url });
// } catch (error) {
//   return res.status(500).json({ error: error.message });
// }
// });

// export default connectDB(router);
