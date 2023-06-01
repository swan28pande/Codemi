const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProblemSchema = new Schema({
    problemId: {
        type: String,
        required: [true, 'field is required']
    },
    title: {
        type: String,
        required: [true, 'field is required']
    },
    difficulty: {
        type: String,
        required: [true, 'field is required']
    },
    acceptance: {
        type: String,
        required: [true, 'field is required']
    },
    description: {
        type: String,
        required: [true, 'field is required']
    },
    exampleIn: {
        type: String,
        required: [true, 'field is required']
    },
    exampleOut: {
        type: [String],
        required: [true, 'field is required']
    },

});

const Problem = mongoose.model('Problems', ProblemSchema);

const UserSchema = new Schema({
   
    email: {
        type: String,
        required: [true, 'field is required']
    },
    password: {
        type: String,
        required: [true, 'field is required']
    },
    id: {
        type: String,
        required: [true, 'field is required']
    },

});

const User = mongoose.model('Users', UserSchema);


module.exports = {Problem,User};