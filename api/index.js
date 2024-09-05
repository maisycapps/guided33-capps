const router = require("express").Router();
module.exports = router;

// Current Route Location /api
router.use("/authors", require("./authors"));
router.use("/books", require("./books"));