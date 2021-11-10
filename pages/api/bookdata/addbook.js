import nc from 'next-connect';
import connectDB from '../../../Backend/config/db';
import BookData from '../../../Backend/Models/picturesData';

const handler = nc();
handler.post(async (req, res) => {
  try {
    const { email, browserType, userID } = req.body;
    var subsciber = new Subscriber({
      email: email,
      userID,
      browserType: browserType,
    });

    // Create new subscriber
    const subscribercreated = await subsciber.save();

    if (!subscribercreated) {
      throw new Error('Saving the email address');
    }

    return res.status(201).send(subscribercreated);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default connectDB(handler);
