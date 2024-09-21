const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");

const http = require("http");
const server = http.createServer(app);

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    })
);

require("dotenv").config();

app.use(bodyParser.json());
app.use(cookieParser());

//Backend
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/caregiverBERoutes"));
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/serviceRoutes"));

//Frontend
app.use("/api", require("./routes/frontend/caregiverRoutes"));
app.use("/api", require("./routes/frontend/authRoutes"));
app.use("/api", require("./routes/frontend/homeRoutes"));
app.use("/api", require("./routes/frontend/cartRoutes"));

app.use("/api", require("./routes/orderRoutes"));

app.get("/", (req, res) => res.send("My backend"));

const port = process.env.PORT;
dbConnect();
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
