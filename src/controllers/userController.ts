import { createVauldAccount } from "../vauldAPI/user";
import UserModel from "../models/userModel";

export const createUser = async (req, res) => {
  const { firstName, lastName } = req.body;
  const uid = req.uid;

  // Create vauld user account
  const vauldUserDetails = await createVauldAccount({
    userIdentifier: uid,
    isCorporate: false,
  });

  const vauldData = vauldUserDetails;
  if (!vauldData.success && vauldData.error) {
    throw new Error(vauldData.error?.message);
  }

  try {
    const result = await UserModel.create({
      firstName,
      lastName,
      firebaseIdentifier: uid,
      _private: {
        _vauldUserId: "621f8102f91f6f001cd1c24e",
      },
    });
    return res.status(201).json({ success: true, data: result.data });
  } catch (error) {
    return res.status(500);
  }
};

export const getUser = async (req, res) => {
  try {
    const uid = req.uid;
    const user = await UserModel.findOne({ firebaseIdentifier: uid });
    if (!user) {
      return res.status(200).json({ exists: false });
    }
    return res.status(200).json({ exists: true, data: user });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

export const getUserByFirebaseIdentifier = async (uid: string) => {
  const user = await UserModel.findOne({ firebaseIdentifier: uid });
  return user;
};
