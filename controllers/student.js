const studentSchema = require("../models/student");

exports.addStudent = async (req, res) => {
  try {
    console.log("hello");

    const student = await studentSchema.insertMany(req.body.students);

    res.status(200).send({
      success: true,
      student,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const id = req.user.id;
    const student = await studentSchema.findById(id);

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.getAllStudent = async (req, res) => {
  console.log("enter");
  try {
    const id = req.query.id;
    console.log(req.query.totalMark);
    console.log(req.query.standard)
    console.log(req.query.page);
    let filterquery = {};
    if (req.query.searchValue) {
      filterquery.name = { $regex: req.query.searchValue, $options: "i" };
    }
    if (req.query.gender) {
      filterquery.gender = req.query.gender;
    }
    if(req.query.standard){
      filterquery.standard = req.query.standard
    }

    if (req.query.totalMark) {
      console.log(req.query.totalMark);
      if (parseInt(req.query.totalMark) >= 90) {
        filterquery.totalMark = { $gte: parseInt(req.query.totalMark) };
      }
      if (parseInt(req.query.totalMark) <= 89) {
        console.log("working");
        filterquery.totalMark = { $lt: 90 };
      }
    }
    console.log(filterquery);
    const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    const total = await studentSchema.countDocuments(filterquery);
    console.log(total);
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    const page_size = 5;

    const results = await studentSchema
      .find(filterquery)
      .limit(page_size)
      .skip(page_size * parseInt(page - 1));
    console.log(results);

    res.status(200).json({ totalPages: Math.ceil(total / page_size), results });

    // const students = await studentSchema.find({});
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = req.user.id;
    await studentSchema.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "deleted student successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};
