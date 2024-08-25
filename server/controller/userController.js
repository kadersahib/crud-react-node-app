import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    //Create New User
    const newUser = new User(req.body);
    const { email } = newUser;
    //Check email already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }
    // save to the database
    const savedData = await newUser.save();
    // res.status(200).json(savedData);
    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const userData = await User.find();
    // If no users are found, send a 404 error response
    if (!userData || userData == 0) {
      return res.status(404).json({ message: "Users is Not Found " });
    }
    // Send a success response with the fetched users data
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    // Extracting the user ID from the request parameters
    const id = req.params.id;
    // Finding a user by ID in the database and waiting for the result
    const userExist = await User.findById(id);
    // Checking if the user does not exist
    if (!userExist) {
      return res.status(404).json({ message: "User is Not Found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    // Extracting the user ID from the request parameters
    const id = req.params.id;
    // Finding a user by ID in the database and waiting for the result
    const userExist = await User.findById(id);
    // Checking if the user does not exist
    if (!userExist) {
      return res.status(404).json({ message: "User is Not Found" });
    }
    // Updating the user data in the database with the new data from the request body
    // The { new: true } option returns the updated document
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json(updatedData);
    // Alternatively, you could send a success message
    res.status(200).json({ message: "User Updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteById = async (req, res) => {
  const id = req.params.id;
  const userExist = await User.findById(id);
  if (!userExist) {
    return res.status(404).json({ message: "User Is Not Found" });
  }
  await User.findByIdAndDelete(id);
  //   res.status(200).json(deletedata);
  res.status(200).json({ message: "User deleted successfully." });
};
