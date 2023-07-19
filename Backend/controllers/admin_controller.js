const entry_model = require("../models/entry_model");
const admin_model = require("../models/admin_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employee_model = require("../models/employee_model");

require("dotenv").config();

const registerController = async (req, res) => {
  try {
    const exisitingAdmin = await admin_model.findOne({ email: req.body.email });
    if (exisitingAdmin) {
      return res
        .status(200)
        .send({ message: "Admin User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);//salt is used for making password more protected
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newAdmin = new admin_model(req.body);
    await newAdmin.save();
    res.status(201).send({ message: "Admin Registered Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Admin Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const admin = await admin_model.findOne({ email: req.body.email });
    if (!admin) {
      return res
        .status(200) //200 denotes OK
        .send({ message: "admin not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "admin Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in admin Login CTRL ${error.message}` });
  }
};

// update status
const updateEntryController = async (req,res) => {

    try {
        const { id } = req.params;
        const { status, upd_remarks } = req.body;

        const entry = await entry_model.findByIdAndUpdate(
          id,
          { status, upd_remarks },
          { new: true }
        );
        // const employee = await employee_model.findOne({ _id : entry.emp_id })

        entry.status = req.body.status;
        entry.upd_remarks = req.body.upd_remarks;
        entry.upd_date = Date.now();
        await entry.save();
        res.status(201).send({
            success: true,
            message: "Entry Updated",
            data: entry,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error in updating status",
            error,
          });
        }
};


const GetAllEntryController = async(req,res) =>{
  try { 
      const entry = await entry_model.find({}); 
      res.status(200).send({
          success:true , 
          message: 'All entries fetched successfully' , 
          data : entry, 
      }); 
      
  } catch (error) {   
      console.log(error) 
      res.status(500).send({
          success:false , 
          message:'error while fetching entry' , 
          error,
      })
  }
};

const getAllEmployeesController = async(req,res) =>{
  try { 
      const emps = await employee_model.find({}); 
      res.status(200).send({
          success:true , 
          message: 'users data' , 
          data : emps, 
      }); 
  } catch (error) {   
      console.log(error) 
      res.status(500).send({
          success:false , 
          message:'error while fetching users' , 
          error,
      })
  }
}; 

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the employee by their ID
    const employee = await employee_model.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employee',
    });
  }
};

const getAdminByIdController = async (req, res) => {
  try {
    const admin = await admin_model.findById(req.body.eid);
    res.status(200).send({
      success: true,
      message: "Single admin info Fetched",
      data: admin, 
    }); 
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in single admin Info",
    });
  }
};

const deleteAllEntries = async (req, res) => {
  try {
    // Delete all entries in the entry_model
    await entry_model.deleteMany();

    res.status(200).json({
      success: true,
      message: 'All entries have been deleted.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete entries.',
    });
  }
};

module.exports = {loginController, registerController, updateEntryController, getAllEmployeesController, GetAllEntryController, getAdminByIdController, getEmployeeById, deleteAllEntries};