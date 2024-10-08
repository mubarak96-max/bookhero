import mongoose from 'mongoose';

// const connectDB = (handler) => async (req, res) => {
//   if (mongoose.connections[0].readyState) {
//     // Use current db connection
//     return handler(req, res);
//   }
//   // Use new db connection
//   await mongoose.connect(process.env.MONGO_URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });

//   console.log('MongoDB connected successfully');
//   return handler(req, res);
// };

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;
