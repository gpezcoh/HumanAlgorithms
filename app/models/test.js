var mongoose = require('mongoose'),
  Question = mongoose.model('Question');
  Schema = mongoose.Schema;

// Question = require("./question").QuestionSchema

var TestSchema = new Schema({
	correct: Number,
	total: Number,
	email: String,
	// questions: [Question],
	questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
	sections: Number,
	sectionProgress: Number,
	sectionTotal: Number,
	sectionLengths: [Number]
});

// TestSchema.methods.addQuestions = function(sections) {
// 	console.log(sections)
// 	for(var j = 0; j < sections; ++j){
// 		console.log(j)
// 		for(var i = 0; i < 4; ++i){
// 			console.log(i)
// 			console.log("wut")
// 			this.questions.push(Question.createQuestion(1,10))
// 			console.log("wut")
// 		}
// 	}
// }

mongoose.model('Test', TestSchema);

