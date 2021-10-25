import React, { useState } from "react";
import Signup from "./Signup";
import {Container} from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import './App.css'
import Geocode from "react-geocode";
import moment from 'moment';

Geocode.setApiKey("AIzaSyA5XosDPFC34pun--KQkismaRS7V1u5bns");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
Geocode.setRegion("au");


const OPENWEATHER_API = {
    // key: "429736441cf3572838aa10530929f7cd",
    key: "6557810176c36fac5f0db536711a6c52",
    base: "https://api.openweathermap.org/data/2.5",
    
  }  

function App() {    
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

       
    // Get latitude & longitude from address from Google API
    // Then Get onecall weather API from OpenWeatherMap.org
    const searchStart = evt => { 
        if (evt.key === "Enter") {
            Geocode.fromAddress(query)  
                .then(async (response) => {                     
                    var lat = await (Math.round(response.results[0].geometry.location.lat));
                    var lng = await (Math.round(response.results[0].geometry.location.lng));  
                    setLocation(response.results[0].formatted_address);                 
                    console.log(lat, lng);  
                    console.log(response);
                fetch(`${OPENWEATHER_API.base}/onecall?lat=${lat}&lon=${lng}&exclude={part}&units=metric&appid=${OPENWEATHER_API.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);            
                    setQuery('');
                    console.log(result);
                    setError("");
                  });
                },
                (error) => {
                    console.error(error);
                    setError("Error - type valid location");
                }
            ) ;
        }
    }

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
     }
      


    return (
            <div>
            <div className="top-box">
                <div class="row">
                    <div class="col-12 col-md-8">          
                        <div className="title">
                            <h2>Edge Weather</h2>
                        </div>
                        <div className="search-bar">
                            <input text="text" placeholder="Enter search location..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={searchStart}/>
                            <p>{error}</p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                    <Container
                        className="d-flex align-items-center justify-content-center"
                        style={{MinHeight: "100vh"}}>
                        <div className="w-100" style={{maxWidth: "400px"}}>              
                            <Router>
                                <AuthProvider>
                                    <Switch>
                                        <PrivateRoute exact path="/" component={Dashboard}/>
                                        <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                                        <Route path="/signup" component={Signup}/>
                                        <Route path="/login" component={Login}/>
                                        <Route path="/forgot-password" component={ForgotPassword}/>
                                    </Switch>
                                </AuthProvider>
                            </Router>
                        </div>
                    </Container>
                </div>
            </div>
            </div>
                                           

            {(typeof weather.current != "undefined") ? (      
             
                // weather card starts
                <div>
                    <div className="card card-weather">
                        <div className="card-body">
                            <div class="row">
                                <div class="col-12 col-md-4">
                                    <div class="weather-date-location">
                                        <h5> <span class="weather-date"></span> <span class="weather-location">{location}</span> </h5>
                                        <h3 class="text-white">{moment((weather.current.dt)*1000).format("dddd")}</h3>
                                        <p class="text-white"> <span class="weather-date">{moment((weather.current.dt)*1000).format("MMMM Do YYYY")}</span></p>                                                       
                                    <div class="description">
                                        <img src={`https://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`} alt="Weather Icon" width="150px" height="150px"/>
                                        <h5> {titleCase(weather.current.weather[0].description)}</h5>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4" >
                                    <div class="weather-data">
                                        <div class="temp">
                                            <h4 class="display-3">{Math.round(weather.current.temp)}&deg;</h4>
                                            <h5 class="text-gray"> Feels like {Math.round(weather.current.feels_like)}&deg;</h5>
                                            <p class="min-max">{Math.round(weather.daily[0].temp.min)}&deg; Min / {Math.round(weather.daily[1].temp.max)}&deg; Max</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="extras">
                                        <h5 class="tex-gray">{/* <p>Rain {weather.current}</p> */}</h5>
                                        <h5 class="text-gray">Wind - {weather.daily[0].wind_speed} m/s</h5>
                                        <h5></h5>
                                        <h5 class="text-gray">Gusts - {weather.daily[0].wind_gust} m/s</h5>
                                        <p></p>
                                        <h5 class="text-gray">Humidity - {weather.daily[0].humidity} %</h5>
                                        <p></p>
                                        <h5 class="text-gray">UV Index - {weather.daily[0].uvi}</h5>
                                        <p></p>
                                        <h5 class="text-gray">Sunrise - {moment((weather.daily[0].sunrise)*1000).format("LT")}</h5>
                                        <h5 class="text-gray">Sunset - {moment((weather.daily[0].sunset)*1000).format("LT")}</h5>
                                        <p></p>
                                    </div>
                                </div>
                                </div>             
                            </div>
                        
                        <div class="card-body p-0">
                            <div class="d-flex weekly-weather">
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[1].dt)*1000).format("dddd")} </p> 
                                    <img height="80" width="80" src={`https://openweathermap.org/img/w/${weather.daily[1].weather[0].icon}.png`} alt="Weather Icon" />
                                    <p class="mb-0"> {Math.round(weather.daily[1].temp.min)}&deg;/
                                            {Math.round(weather.daily[1].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[1].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[2].dt)*1000).format("dddd")} </p> 
                                    <img height="80" width="80" src={`https://openweathermap.org/img/w/${weather.daily[2].weather[0].icon}.png`} alt="Weather Icon" />
                                    <p class="mb-0"> {Math.round(weather.daily[2].temp.min)}&deg;/
                                            {Math.round(weather.daily[2].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[2].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[3].dt)*1000).format("dddd")} </p> 
                                    <img height="80" width="80" src={`https://openweathermap.org/img/w/${weather.daily[3].weather[0].icon}.png`} alt="Weather Icon" />
                                    <p class="mb-0"> {Math.round(weather.daily[3].temp.min)}&deg;/
                                            {Math.round(weather.daily[3].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[3].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[4].dt)*1000).format("dddd")} </p> 
                                    <img height="80" width="80" src={`https://openweathermap.org/img/w/${weather.daily[4].weather[0].icon}.png`} alt="Weather Icon" />
                                    <p class="mb-0"> {Math.round(weather.daily[4].temp.min)}&deg;/
                                            {Math.round(weather.daily[4].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[4].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[5].dt)*1000).format("dddd")} </p> 
                                    <img height="80" width="80" src={`https://openweathermap.org/img/w/${weather.daily[5].weather[0].icon}.png`} alt="Weather Icon" />
                                    <p class="mb-0"> {Math.round(weather.daily[5].temp.min)}&deg;/
                                            {Math.round(weather.daily[5].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[5].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[6].dt)*1000).format("dddd")} </p> 
                                    <img height="80" width="80" src={`https://openweathermap.org/img/w/${weather.daily[6].weather[0].icon}.png`} alt="Weather Icon" />
                                    <p class="mb-0"> {Math.round(weather.daily[6].temp.min)}&deg;/
                                            {Math.round(weather.daily[6].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[6].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[7].dt)*1000).format("dddd")} </p> 
                                    <img height="80" width="80" src={`https://openweathermap.org/img/w/${weather.daily[7].weather[0].icon}.png`} alt="Weather Icon" />
                                    <p class="mb-0"> {Math.round(weather.daily[7].temp.min)}&deg;/
                                            {Math.round(weather.daily[7].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[7].weather[0].description)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    // weather card ends
                    
            ) : ('')}
        </div>
    )
}

export default App;
