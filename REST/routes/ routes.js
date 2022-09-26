const express = require('express');
const { db } = require('../model/model');
const Model = require('../model/model');
const SemModel = require('../model/semModel')
const SubModel = require('../model/subModel')
const StudentModel = require('../model/studentModel')
const MarksModel = require('../model/marksModel');
const semModel = require('../model/semModel');
const studentModel = require('../model/studentModel');
const marksModel = require('../model/marksModel');


const router = express.Router()

/*
//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
*/

//  posting the data to the db
// router.post('/post', async (req, res) => {
//     const data = new Model({
//         name: req.body.name,
//         usn:req.body.usn,
//         age: req.body.age
//     })

//     try {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

// //get all data from db
// router.get('/getAll', async (req, res) => {
//     try{
//         const data = await Model.find();
//         res.status(200)
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// //get by Id
// //Get by ID Method
// router.get('/getOne/:id', async (req, res) => {
//     try{
//         const data = await Model.findById(req.params.id);
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//         res.send("not found")
//     }
// })

// //Update by ID Method
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )
//         res.status(200).json(result);
//         // res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//         // res.send("Given Id is invalid")
//     }
// })

// //Delete by ID Method
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id)
//         res.status(200).json(data);
//         // res.send(`Document with ${data.name} has been deleted..`);
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//         // res.send("Given id not found in our database");
//     }
// })




//posting semester subject and marks of student

router.post('/sem', async (req, res) => {
    const data = new SemModel(req.body);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/sub', async (req, res) => {
    const data = new SubModel(req.body)

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/student', async (req, res) => {
    const data = new StudentModel(req.body)

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/marks', async (req, res) => {
    const data = new MarksModel(req.body)

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

/*********************************GETTING SEM DETAIL************************************************* */
router.get('/getSem', async (req, res) => {
    try{
        const data = await semModel.find();
        res.status(200)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//get students over all toppers with sorted order
router.get('/getStudentTopper', async (req, res) => {
    try{
        const data = await studentModel.find({percentage:{$gte:77.5}},{_id:0,__v:0}).sort({totalmarks:-1});
        res.status(200)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//get subject wise topper with sorted order

router.get('/getSubjectTopper', async (req, res) => {
    try{
        let _subID =  await SubModel.find({},{_id:1});
        let Data = new Array();
        for(let i=0; i<_subID.length; i++){
            let markpersubObj = await MarksModel.find({ subId: _subID[i]._id }).sort({ totalMarksPerSubject: -1 });
            Data.push(markpersubObj[0]);
        }
        res.status(200).json(Data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/Subjectdetails', async (req, res) => {
    try{
        const data = await SubModel.find({},{_id:1,subject:1});
        res.status(200)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

/************************GET SUBJECTWISE FAILURES (Passing Mark:21)****************/
router.get('/subjectwisefailure', async (req, res) => {
    try{
        let _subID =  await SubModel.find({},{_id:1});
        let Data = new Array();
        // let total_failure = 0;
        for(let i=0; i<_subID.length; i++){
            let failuredetailsObj = await MarksModel.find({subId: _subID[i]._id, ea : {$lt :21}});
            // total_failure+=failuredetailsObj.length
            Data.push(failuredetailsObj);
        }
        res.status(200)
        res.json(Data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

/************************DELETE RECORDS************************************** */
router.delete('/deleteStd',async(req,res)=>{
    try{
        StudentModel.collection.deleteMany({})
        res.status(200).send("Done");
    }catch(e){
        res.status(500).json({message: e.message})
    }
})
router.delete('/deleteSub',async(req,res)=>{
    try{
        SubModel.collection.deleteMany({})
        res.status(200).send("Done");
    }catch(e){
        res.status(500).json({message: e.message})
    }
})
router.delete('/deleteMark',async(req,res)=>{
    try{
        MarksModel.collection.deleteMany({})
        res.status(200).send("Done");
    }catch(e){
        res.status(500).json({message: e.message})
    }
})


module.exports = router; 