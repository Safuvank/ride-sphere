const express = require("express");
const User = require("../models/user.model");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}


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
    console.log(error);
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
    console.log(error);
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
    console.log(err)
    res.status(500).json({message: "Server error"})
  }
}