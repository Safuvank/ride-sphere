// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Product = require("./models/Products");
// const User = require("./models/User");
// const Cart = require("./models/Cart");
// const products = require("./data/products");

// dotenv.config();

// //connect to mongoDB
// mongoose.connect(process.env.MONGO_URI);

// // function seed data

// const seedData = async () => {
//   try {
//     //clear existing data
//     await Product.deleteMany();
//     await User.deleteMany();
//     await Cart.deleteMany();

//     // create a default admin user
//     const createdUser = await User.create({
//       name: "Admin User",
//       email: "admin@example.com",
//       password: "123456",
//       role: "admin",
//     });

//     // Assign the default user ID to each product
//     const userID = createdUser._id;

//     const sampleProducts = products.map((product) => {
//       return { ...product, user: userID };
//     });

//     // insert the products into the database
//     await Product.insertMany(sampleProducts);

//     console.log("Product data seeded successful");
//     process.exit()
//   } catch (error) {
//     console.log("Error seeding the data", error)
//     process.exit(1)
//   }
// };

// seedData()