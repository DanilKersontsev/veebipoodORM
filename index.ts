import express from "express";
import mongoose from "mongoose";
import ProductRoutes from "./routes/productRoutes";
import InvoiceRoutes from "./routes/invoiceRoutes";

const app = express();
const port = process.env.PORT || 2000;

// MongoDB ühendus
mongoose.connect("mongodb+srv://danilkersontsev1:pdzyta85aSBnwcaD@cluster0.gbyd0iv.mongodb.net/veebipood", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const database = mongoose.connection;

database.on("error", (error) => {
    console.error("Andmebaasiviga:", error);
});

database.once("connected", () => {
    console.log("Andmebaas ühendatud");
});

// Rakenduse kasutamine JSON-parserina
app.use(express.json());

// Kasuta tootemarsruute
app.use("/api/products", ProductRoutes);


// Kasuta arvemarsruute
app.use("/api/invoices", InvoiceRoutes);

app.get("/", (req, res) => {
    res.send("Tere tulemast veebipoodi!"); // Saate seda muuta vastavalt oma vajadustele
});


app.listen(port, () => {
    console.log(`Server kuulab pordil ${port}`);
});
