const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename : function(req,file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage : storage});

const Comment = require('../models/comment');


router.get('/', (req,res,next)=> {
    Comment.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})
    });
});


router.post('/',upload.single('commentFile') ,(req,res,next)=> {
    console.log(req.file);
    const comment = new Comment({
        _id : new mongoose.Types.ObjectId(),
        text : req.body.text,
        sender : req.body.sender,
        questionId : req.body.questionId,
        commentFile: req.file.path
    });
    comment.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : 'POSTed a Comment',
            comment : comment
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})
    });
});

router.post('/' ,(req,res,next)=> {
    console.log(req.file);
    const comment = new Comment({
        _id : new mongoose.Types.ObjectId(),
        text : req.body.text,
        sender : req.body.sender,
        questionId : req.body.questionId,
        
    });
    comment.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : 'POSTed a Comment',
            comment : comment
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})
    });
});


router.get('/:questionId',(req,res,next)=>{
    const id = req.params.questionId;
    Comment.find({questionId :id})
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
        res.status(200).json(doc);
        } else{
            res.status(404).json({message : 'No such COMMENT for this ID'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})
    });
});




router.delete('/:commentId',(req,res,next)=>{
    const id = req.params.commentId
    Comment.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            commentDeleted : id,
            deleted : "yes"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})
    });
});



module.exports = router;



