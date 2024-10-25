const express=require("express");
const app=express();
const database=require("./config/database");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const userRoutes=require("./routes/user");
const attendanceRoutes=require("./routes/attendance");

const PORT=process.env.PORT|3000;

database.connect();
app.use(express.json());

app.use(cookieParser());
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/att", attendanceRoutes);
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});