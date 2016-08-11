var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'user'},
  students: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('course', CourseSchema);
