const express = require("express");
const { db } = require("../model/model");
const Model = require("../model/model");
const batchModel = require("../model/batchModel");
const SemModel = require("../model/semModel");
const SubModel = require("../model/subModel");
const StudentModel = require("../model/studentModel");
const MarksModel = require("../model/marksModel");
const semModel = require("../model/semModel");
const studentModel = require("../model/studentModel");
const marksModel = require("../model/marksModel");

const router = express.Router();

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

//posting batch, semester, subject, student and mark details
router.post("/batch", async (req, res) => {
  const data = new batchModel(req.body);

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/sem", async (req, res) => {
  const data = new SemModel(req.body);

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/sub", async (req, res) => {
  const data = new SubModel(req.body);

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/student", async (req, res) => {
  const data = new StudentModel(req.body);

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/marks", async (req, res) => {
  const data = new MarksModel(req.body);

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*********************************GETTING SEM DETAIL************************************************* */
router.get("/getBatch/:batch", async (req, res) => {
  try {
    const data = await batchModel.find({ batch: req.params.batch }, { _id: 1 });
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getSem/:sem", async (req, res) => {
  try {
    const data = await semModel.find({ sem: req.params.sem }, { batchId: 1 });
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get students over all toppers with sorted order
router.get("/getStudentTopper/:semId", async (req, res) => {
  try {
    const data = await studentModel
      .find(
        { semId: req.params.semId, percentage: { $gte: 77.5 } },
        { _id: 0, __v: 0 }
      )
      .sort({ totalmarks: -1 });
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get subject wise topper with sorted order

function helper(sub) {
  return new Promise(async (res, rej) => {
    let markpersubObj = await MarksModel.aggregate([
      {
        $match: {
          $expr: {
            // $eq: ["$subId", sub._id],
            $and: [
              { $eq: ["$subId", sub._id] },
              { $eq: ["$semId", sub.semId] },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "Student",
        },
      },
      {
        "$unwind": "$Student"
      },
      {
        $lookup: {
          from: "subjects",

          localField: "subId",
          foreignField: "_id",
          as: "Subject",
        },
      },
    ]).sort({ totalMarksPerSubject: -1 });
    res(markpersubObj[0]);
  });
}

router.get("/getSubTopper/:semId", async (req, res) => {
  try {
    let _subID = await SubModel.find(
      { semId: req.params.semId },
      { _id: 1, semId: 1 }
    );
    let Data = new Array();
    // for(let i=0; i<_subID.length; i++){

    _subID.forEach((sub) => {
      Data.push(helper(sub));
    });
    Promise.all(Data).then((val) => {
      res.status(200).json(val);
    });

    // console.log(i)
    // Data.push(markpersubObj);
    // }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/Subjectdetails", async (req, res) => {
  try {
    const data = await SubModel.find({}, { _id: 1, subject: 1 });
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/************************GET SUBJECTWISE FAILURES (Passing Mark:21)****************/

function helper2(sub) {
  return new Promise(async (res, rej) => {
    let markpersubObj = await MarksModel.aggregate([
      {
        $match: {
          $expr: {
            // $eq: ["$subId", sub._id],
            $and: [
              { $eq: ["$subId", sub._id] },
              { $eq: ["$semId", sub.semId] },
              { $lt: ["$ea", 21] },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "Student",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subId",
          foreignField: "_id",
          as: "Subject",
        },
      },
    ]);
    res(markpersubObj);
  });
}

router.get("/subfailure/:semId", async (req, res) => {
  try {
    let _subID = await SubModel.find(
      { semId: req.params.semId },
      { _id: 1, semId: 1 }
    );
    console.log(_subID);
    let Data = new Array();
    // for(let i=0; i<_subID.length; i++){

    _subID.forEach((sub) => {
      Data.push(helper2(sub));
    });
    Promise.all(Data).then((val) => {
      res.status(200).json(val);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/************************DELETE RECORDS************************************** */
router.delete("/deleteStd", async (req, res) => {
  try {
    StudentModel.collection.deleteMany({});
    res.status(200).send("Done");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.delete("/deleteSub", async (req, res) => {
  try {
    SubModel.collection.deleteMany({});
    res.status(200).send("Done");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.delete("/deleteMark", async (req, res) => {
  try {
    MarksModel.collection.deleteMany({});
    res.status(200).send("Done");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.delete("/deleteSem", async (req, res) => {
  try {
    SemModel.collection.deleteMany({});
    res.status(200).send("Done");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//get according to sem

function helpergetSem(std) {
  return new Promise(async (res, rej) => {
    let markpersubObj = await MarksModel.aggregate([
      {
        $match: {
          $expr: {
            // $eq: ["$subId", sub._id],
            $and: [{ $eq: ["$studentId", std._id] }, { $eq: ["$semId", std.semId] }],
          },
        },
      },
      // {
      //   $lookup: {
      //     from: "students",
      //     localField: "studentId",
      //     foreignField: "_id",
      //     as: "Student",
      //   },
      // },
      {
        $lookup: {
          from: "subjects",
          localField: "subId",
          foreignField: "_id",
          as: "Subject",
        },
      },
      {
        "$unwind": "$Subject"
      },
      { $project: { "Subject.subject":1 } } 
    ]);
    obj = {
      name:std.name,
      size:markpersubObj
    }
    res(markpersubObj.length);
  });
}

router.get("/Sem/:semId", async (req, res) => {
  try {
    let _student = await StudentModel.find({ semId: req.params.semId }).sort({ usn: 1});
   
    let Data = new Array();
      _student.forEach((std) => {
        Data.push(helpergetSem(std));
      });
      Promise.all(Data).then((val) => {
        res.status(200).json(val);
      });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
