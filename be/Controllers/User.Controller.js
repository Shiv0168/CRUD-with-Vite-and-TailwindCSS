const { User } = require("../Model/User.Model");

const createUser = async (req, res) => {
  try {
    const data = await new User(req.body).save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getAllUser = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: `user not found with id : ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    if (data) {
      const data1 = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(data1);
    } else {
      res.status(404).json({ message: `user not found with id : ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    if (data) {
      const data1 = await User.deleteOne({ _id: id });
      res.status(200).json(data1);
    } else {
      res.status(404).json({ message: `user not found with id : ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createUser, getAllUser, getById, editUser, deleteUser };
