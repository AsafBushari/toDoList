//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items_array = [];

app.get('/', function(req, res){
  let current_date = new Date();
  const options = {
    weekday: "long",
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  var time = new Date();
  let current_hour = time.toLocaleString('he-IL', { hour: '2-digit', hour24: true });
  let main_title = dayStatus(current_hour);

  let c_date = current_date.toLocaleDateString(undefined, options);
  res.render("list-template",{title: main_title, items: items_array, date: c_date});
});
app.post('/', function(req, res){
  items_array.push(req.body.list_value);
  res.redirect("/");
});

app.listen(3000 || process.env.PORT, function(){
	console.log('i am listening....')
});
function dayStatus(hour){
  if(6 <= hour && hour <= 11){
    return 'Good Morning';
  }
  else if(11 <= hour && hour <= 18){
    return 'Good Afternoon';
  }
  else{
    return 'Good Night'
  }
}
