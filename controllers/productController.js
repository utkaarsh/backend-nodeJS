const Employee = require("../model/Employee");
const Product = require("../model/Product");
const cloudinary = require("cloudinary");
const getDataUri = require("../utils/dataUri");

const createNewProduct = async (req, res) => {
  console.log("File", req);

  try {
    const { name, price, quantity, category, status } = req.body;
    const file = req.files;

    // const fileUri = getDataUri(file);
    // const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    // console.log("Image", req);
    // if (Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ error: "No file was uploaded. &&" });
    // }
    // const { imageFileName } = req.files;

    const newProduct = new Product({
      name,
      price,
      category,
      status,
      quantity,
      // poster: {
      //   public_id: myCloud.public_id,
      //   url: myCloud.url,
      // },
    });

    await newProduct.save();

    res.status(201).json({ message: "Product created successfully" });
    console.log("Product created successfully");
  } catch (error) {
    console.error(error);
    console.log("File URI", req);

    res.status(500).json({ message: "There is an Internal Server Error bro" });
  }
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) return res.status(204).json({ message: "No products found." });
  res.json(products);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }

  try {
    const result = await Employee.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  }
  if (req.body?.firstname) employee.firstName = req.body.firstname;
  if (req.body?.lastname) employee.lastName = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required." });

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  }
  const result = await employee.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID required." });

  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}.` });
  }
  res.json(employee);
};

module.exports = {
  getAllProducts,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  createNewProduct,
};
