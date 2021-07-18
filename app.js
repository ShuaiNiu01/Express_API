const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = "6d9528d6c7cfacd8d57a4ae0897695e3";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("<h1>The tempreature in "+query+" is " + temp + "degrees Celcius.</h1>")

      const iconId = weatherData.weather[0].icon;
      res.write("<img src='http://openweathermap.org/img/wn/" + iconId + "@2x.png'>");
      res.send();
    });
  });

});

app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
