// Install express, set port
const express = require("express")
const app = express()
const PORT = 3000

// Middleware
app.use(express.json())
app.use(require("morgan")("dev"))

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(res.status || 500).send({error: error})
})

// API Routes
app.use("/api", require("./api"));

// Run Server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));