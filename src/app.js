const path = require("path")
const request = require("request")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) =>{
    res.render("index", {
        title:"Weather",
        name:"Kevin Erick",
        
    })
})

app.get("/about", (req, res) =>{
    res.render("about", {
        title:"About Me",
        name:"Kevin Erick",
        
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title:"Help",
        name: "Kevin Erick",
        helpText: "This is the help page",
        
    })
})

app.get ( "/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Kindly provide a location address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404errors",{
        title: "404 Error",
        errorMessage: "Help article not found.",
        name: "Kevin Erick"
    })
})

app.get("*", (req, res) => {
    res.render("404errors",{
        title: "404 Error",
        errorMessage: "Page not found.",
        name: "Kevin Erick"
    })
})

app.listen(port, () => {

    console.log("Server is up on port " + port);
    
})

