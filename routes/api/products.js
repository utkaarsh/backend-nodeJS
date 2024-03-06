const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/productController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const multer = require("multer");
const storage = multer.memoryStorage();

// Create Multer instance with the configured storage
const upload = multer({ storage: storage });
router.post(
  "/upload",
  // upload.single("productImage"),
  employeesController.createNewProduct
);

router
  .route("/")
  .get(employeesController.getAllProducts)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(employeesController.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
