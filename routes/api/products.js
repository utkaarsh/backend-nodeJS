const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/productController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Set the filename to be unique (you can customize this logic)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create Multer instance with the configured storage
const upload = multer({ storage: storage });
router.post(
  "/upload",
  upload.single("image"),
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
