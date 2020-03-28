const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    _id :  mongoose.Schema.Types.ObjectId,
    givenId : {type : String, required : true},
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type : String, required : true, match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password : {type : String, required : true},
    role :{type : String, required : true},
    schoolYearBegin :{type : Date, required : true},
    schoolYearEnd : {type : Date, required : true},
    stageName : {type : String, required : true},
    stageDesc : {type : String, required : true},
    stageBegin : {type : Date, required : true},
    stageEnd : {type : Date, required : true},
});

module.exports = mongoose.model('User', userSchema)