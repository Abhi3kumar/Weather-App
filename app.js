const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
 res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query=req.body.CityName;
  const apiKey="20acb24867d34fa2e769eee44b893da5";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const WeatherData=JSON.parse(data); //object
      const temp=WeatherData.main.temp; //object of WeatherData(object of object)
      const des=WeatherData.weather[0].description;
      const icon=WeatherData.weather[0].icon;
      const imgurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>Weather is currently " + des);
      res.write("<h1>The temperature in " + query + " is " + temp + " dergree celcius.</h1>");
      res.write("<img src="+imgurl+">");
      res.send();
    })
  })

});



app.listen(1000, function(){
  console.log("server is running");
});
