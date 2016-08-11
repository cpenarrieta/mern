const Course = require('./courseModel');

exports.get = (req, res, next) => {
  Course
    .find({})
    .populate({ "path" : "teacher", "select" : "-password" })
    .populate({ "path" : "students", "select" : "-password" })
    .exec()
    .then((courses) => {
      res.json(courses);
    })
    .catch((err) => {
      next(err);
    });
};

exports.post = (req, res, next) => {
  var newCourse = req.body;

  Course
    .create(newCourse)
    .then((course) => {
      res.status(201).json(course);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getOne = (req, res, next) => {
  Course
    .findById(req.params.id)
    .populate({ "path" : "teacher", "select" : "-password" })
    .populate({ "path" : "students", "select" : "-password" })
    .exec()
    .then((course) => {
      res.json(course);
    })
    .catch((err) => {
      next(err);
    });
};

exports.put = (req, res, next) => {
  Course
    .findById(req.params.id)
    .exec()
    .then((prevCourse) => {
      if (prevCourse) {
        const updatedCourse = _.merge(prevCourse, req.body);
        return updatedCourse.save();
      }
    })
    .then((savedCourse) => {
      if (savedCourse) {
        res.json(savedCourse);
      } else {
        res.status(400).send('course not found');
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.delete = (req, res, next) => {
  Course
    .findById(req.params.id)
    .exec()
    .then((course) => {
      if (course) {
        return course.remove();
      }
    })
    .then((removedCourse) => {
      if (removedCourse) {
        res.json(removedCourse);
      } else {
        res.status(400).send('course not found');
      }
    })
    .catch((err) => {
      next(err);
    });
};
