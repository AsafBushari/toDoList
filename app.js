//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

let items_array = [];

app.get('/', function(req, res){
  let current_date = new Date();
  const options = {
    weekday: "long",
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  let c_date = current_date.toLocaleDateString(undefined, options);
  res.render("list-template",{test: "Good morning", items: items_array, date: c_date});
});
app.post('/', function(req, res){
  items_array.push(req.body.list_value);
  res.redirect("/");
});

app.listen(3000, function(){
	console.log('i am listening....')
});
