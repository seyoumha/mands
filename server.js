const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//Routes
app.get('/', function(req, res){
    res.render('index');        
})

// app.post('/posts', function(req, res){
//     const new_post = new Post({name: req.body.name, text: req.body.msg});
//     new_post.save(function(err){
//         if(err){
//             res.render('index', {errors: post.errors});

//         } else{
//             console.log('sucess')
//             res.redirect('/')
//         }
//     })
// })
// app.post('/posts/:id', function(req, res){
//     Post.findOne({_id: req.params.id}, function(err, post){
//         console.log(req.body)
//         const new_comment = new Comment(req.body);
//         new_comment._post = post._id;
//         console.log(post.comments)
//         post.comments.push(new_comment);
//         new_comment.save(function(err){

//             if(err){
//                 console.log("comment error", err)
//                 res.render('index', {errors: new_comment.errors, posts: []});
//             }else{
//                 console.log('success')
//                 post.save(function(err){
//                     if(!err){
//                         res.redirect('/');
//                     }else{
//                         console.log('post error', err)
//                         res.render('index', {errors: new_comment.errors, posts: []});
//                     }
//                 });
                
//             }
//         })
//     })
// })



app.listen(8000, function(){
    console.log('listening on port 8000')
})

//Mongoose
mongoose.connect('mongodb://localhost/mands');
mongoose.connection.on('connected', () => console.log('connected to db'))
const Schema = mongoose.Schema;
const RsvpSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4, maxlength: 32},
    email: {type: String, required: true},
    guest_num: {type: Number, required: true},
    event: {type: String, required: true},
    msg: {type: String},
}, {timestamps: true, usePushEach: true})

 mongoose.model('Rsvp', RsvpSchema)

 const Rsvp = mongoose.model('Rsvp');

