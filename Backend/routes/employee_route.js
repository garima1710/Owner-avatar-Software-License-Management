const express = require('express') 
const { AddEntryController, getAllEntriesByEmpId, registerController, loginController , getEmployeeByIdController } = require('../controllers/employee_controller');
const router = express.Router()

const upload = require("../middlewares/upload_approval")

// register
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

// Add Entry 
router.post("/AddEntry",upload.single('approval'), AddEntryController);  

// router.post("/getEmployeeData", getEmployeeByIdController);

// Get all entries
router.post('/GetAllEntryById' , getAllEntriesByEmpId);  

router.post('/getEmployeeById' ,  getEmployeeByIdController);  

module.exports = router