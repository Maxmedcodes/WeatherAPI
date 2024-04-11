import axios from "axios";
import bodyParser from "body-parser";
import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();
const port = 3000;
const API_KEY = "87J7ZLENDLD4VVWBMYWBGJL5M"
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static(__dirname + '/public'));

// const input = document.getElementById("")
var test1 = new Date();
var mydateformat = test1.getFullYear() + "-" + (test1.getMonth() + 1) +"-"+test1.getDate() ;

app.post("/submit", async (req,res)=>{
    
    var location = req.body.location
    try {
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${mydateformat}/${mydateformat}?unitGroup=uk&elements=datetime%2Ctemp&include=days&key=${API_KEY}`)
        const result = JSON.stringify(response.data)
        const temperature = JSON.parse(result);
        console.log(temperature.days[0])
        res.render("results.ejs",{data:location , weather:result})
    
    }catch (error){
        console.log(error.response.data)
    }

})
app.get("/", async (req,res)=>{
    res.render("index.ejs")
})

app.listen(port,(req,res)=>{
    console.log(`Server is running on ${port}`)
})