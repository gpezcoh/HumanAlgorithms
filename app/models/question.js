var _ = require("underscore");

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: String,
  answers: [String],
  correctAnswer: Number
});

QuestionSchema.statics.createQuestion = function(min, max){
	var total = Math.round(Math.random() * (max - min) + min);
	var input1 = total - Math.round(Math.random() * (total - 1));
	var input2 = total - input1;
	var answers = _.shuffle([total,total - Math.round(Math.random() * (total/2)),
		total + Math.round(Math.random() * (total/2)), total * Math.round(Math.random() * (total/2))]);
	return {
		title: "What is " + input1 + " + " + input2 + "?",
		answers: answers,
		correctAnswer: total
	};
}

mongoose.model('Question', QuestionSchema);

