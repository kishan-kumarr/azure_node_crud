import express from "express";
import "dotenv/config"
import bodyParser from "body-parser";
import dbConn from "./db/dbcon.js";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

//database 
dbConn();


// Define your schema and model
const studentSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    marks: String,
    age: String
},{timestamps: true} );


const Student = mongoose.model('Student', studentSchema);


// Create
app.post('/new', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({success: true, message: "Student created successfylly!", student});
    } catch (error) {
        res.status(400).send(error);
    }
});


// Read
app.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({success: true, message: "All students list", totalStudents: students.length, students});
    } catch (error) {
        res.status(500).send(error);
    }
});


// Read by ID
app.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({success: false, message: `Student not found with this ${req.params.id}`});
        }
        res.status(200).json({success: true, student});
    } catch (error) {
        res.status(500).send(error);
    }
});


// Update
app.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({success: false, message: `Student not found with this ${req.params.id}`});

        }
        res.status(200).json({success: true, message:"Student updated successfully!", student});
    } catch (error) {
        res.status(400).send(error);
    }
});


// Delete
app.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({success: false, message: `Student not found with this ${req.params.id}`});
        }
        res.status(200).json({success: true, message: `Student deleted successfully whit this id: ${req.params.id}`});
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use("/health", (req, res) => {
    res.status(200).json({success: true, message: "Health is ok!!!"})
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});