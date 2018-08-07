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
//post to rsvp
app.post('/rsvp', function(req, res){
    const new_rsvp = new Rsvp({'name': req.body.name, 'email': req.body.email, 'guest': req.body.guest, 'attend': req.body.attend, 'msg': req.body.message});
    new_rsvp.save(function(err, myobj){
        if(err){
            res.render('index', {errors: new_rsvp.errors});

        } else{
            res.setHeader('Content-Type', 'application/json');
    		res.send(JSON.stringify({status: 'success'}, null, 3));
        }
    })
})
//list page
app.get('/mandslist', function(req, res){
    Rsvp.find({}, function(err, rsvps){
        let sum = 0        
        if(rsvps.length >=1){
            arr = []
            rsvps.filter(rsvp => arr.push(rsvp['guest']));
            sum = arr.reduce((a,c) => a + c);
        }
        res.render('guests', {rsvps: rsvps, sum: sum});
    }).sort({'_id': -1})
    
})

app.listen(3000, function(){
    console.log('listening on port 3000')
})

//Mongoose
mongoose.connect('mongodb://localhost/mands');
mongoose.connection.on('connected', () => console.log('mongo connected!!'))
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

const RsvpSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 4, maxlength: 32},
    email: {type: String, required: true},
    guest: {type: Number, required: true},
    attend: {type: String, required: true},
    msg: {type: String},
}, {timestamps: true, usePushEach: true})

 mongoose.model('Rsvp', RsvpSchema)

 const Rsvp = mongoose.model('Rsvp');
