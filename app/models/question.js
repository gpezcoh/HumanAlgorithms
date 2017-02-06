var _ = require("underscore");

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: String,
  answers: [String],
  correctAnswer: Number,
  section: Number,
  number: Number
});

QuestionSchema.statics.createQuestion = function(min, max){
	// var total = Math.round(Math.random() * (max - min) + min);
	// var input1 = total - Math.round(Math.random() * (total - 1));
	// var input2 = total - input1;
	// var origchoices = [total]
	// while(origchoices.length < 4){
	// 	var answer = Math.round(Math.random() * 2 * total)
	// 	if(!origchoices.includes(answer)){
	// 		origchoices.push(answer)
	// 	}
	// }
	// var answers = _.shuffle(origchoices);
	// return {
	// 	title: "What is " + input1 + " + " + input2 + "?",
	// 	answers: answers,
	// 	correctAnswer: total
	// };
	return {
		title: "What is 10 + 6?",
		answers: [16,6,3,18],
		correctAnswer: 16
	};
}

mongoose.model('Question', QuestionSchema);

