const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    res.sendFile(`${__dirname}/index.html`);    
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "9ea966c677cefacc1d51556bd4c33dd4"
    const units = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const name = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            
           res.render("index.ejs", {
                city: name, 
                temp: temp, 
                icon: icon, 
                description: description, 
                humidity: humidity, 
                windSpeed: windSpeed
            });
        });
    });
    console.log("Post request recieved");
})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
});