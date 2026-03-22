
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cityRoutes = require("./routes/cityRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const cartRoutes = require("./routes/cartRoutes");
const medicineRoutes = require("./routes/medicineRoutes"); // ✅ ADD THIS
const bloodRoutes = require("./routes/bloodRoutes");


const app = express();

// =====================
// 🔹 Middlewares
// =====================
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// 🔹 Routes
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/medicines", medicineRoutes); // ✅ MOUNT MEDICINE ROUTES
app.use("/api/blood", bloodRoutes);

// =====================
// 🔹 Health Check
// =====================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// =====================
// 🔹 Database
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("Mongo Error ❌", err.message);
    process.exit(1);
  });

// =====================
// 🔹 Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
