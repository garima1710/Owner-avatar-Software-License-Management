const express = require('express') 
const { registerController, loginController, updateEntryController , getAdminByIdController, getAllEmployeesController, GetAllEntryController, getEmployeeById, deleteAllEntries} = require('../controllers/admin_controller');
const router = express.Router()

// register
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

// update status
router.put("/update_status/:id", updateEntryController);

router.get("/getAllEntry", GetAllEntryController);

router.get("/getEmployeeById/:id",getEmployeeById);

router.post('/getAdminById' ,  getAdminByIdController);  

router.post("/getAllEmployees",getAllEmployeesController)

router.delete("/deleteAll",deleteAllEntries);

module.exports = router