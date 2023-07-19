const entry_model = require("../models/entry_model");
const employee_model = require("../models/employee_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const registerController = async (req, res) => {
  try {
    const exisitingEmployee = await employee_model.findOne({ email: req.body.email });
    if (exisitingEmployee) {
      return res
        .status(200)
        .send({ message: "Employee User Already Exist", success: false });
    }
    const password = await req.body.password;
    const salt = await bcrypt.genSalt(10);//salt is used for making password more protected
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newEmployee = new employee_model(req.body);
    await newEmployee.save();
    res.status(201).send({ message: "Employee Registered Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Employee Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const employee = await employee_model.findOne({ email: req.body.email });
    if (!employee) {
      return res
        .status(200) //200 denotes OK
        .send({ message: "Employee not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, employee.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Employee Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Employee Login CTRL ${error.message}` });
  }
};

const AddEntryController = async(req , res) =>{
    try {
      const newEntry = await entry_model({ ...req.body, status: "Pending" });
      if(req.file){
        newEntry.approval = req.file.path
      }
      await newEntry.save();
      res.status(201).send({
        success: true,
        message: "Entry Added Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While adding a entry",
      });
    }
  }; 

  const getAllEntriesByEmpId = async (req, res) => {
    const { eid } = req.body;
  
    try {
      // Find all entries with the specified employee ID
      const entries = await entry_model.find({ emp_id : eid });
  
      res.status(200).json({
        success: true,
        data: entries,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch entries',
      });
    }
  };

  const getEmployeeByIdController = async (req, res) => {
    try {
      const employee = await employee_model.findById(req.body.eid);
      res.status(200).send({
        success: true,
        message: "Single Employee info Fetched",
        data: employee, 
      }); 
      // console.log(Attendee)
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in single employee Info",
      });
    }
  };

  module.exports = {loginController, registerController, AddEntryController, getAllEntriesByEmpId, getEmployeeByIdController};