const express = require("express");
const User = require("../models/user.model");



exports.getUsers = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = 5;

    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { email: { $regex: req.query.keyword, $options: "i" } }
          ]
        }
      : {};

    const count = await User.countDocuments(keyword);

    const users = await User.find(keyword)
      .select("-password")
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      users,
      page,
      pages: Math.ceil(count / limit)
    });

  } catch (error) {
    
    res.status(500).json({ message: "Server Error" });
  }
};




exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    user = await User.create({
      name,
      email,
      password,
      role: role || "customer",
    });

    res.status(201).json({ message: "user created successfully", user });
  } catch (error) {
   
    res.status(500).json({ message: "Server Error" });
  }
}

exports.editUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    }
    

    const updatedUser = await user.save();
    
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    
    res.status(500).json({ message: "Server Error" });
  }
}

exports.deleteUser = async(req,res)=>{
  try{
    const user = await User.findById(req.params.id);
  if(user){
     await user.deleteOne();
     res.json({message: "User deleted succussfully"})
  }else{
    res.status(404).json({message: "User not found"})
  }
    
  }catch(err){
    res.status(500).json({message: "Server error"})
  }
}


exports.toggleBlockUser = async (req,res)=>{
  try{

    const user = await User.findById(req.params.id)

    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    user.blocked = !user.blocked

    const updatedUser = await user.save()

    res.json(updatedUser)

  }catch(err){
    
    res.status(500).json({message:"Server error"})
  }
}