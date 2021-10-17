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
import background from "./assets/background.jpg";
import Geocode from "react-geocode";
import moment from 'moment';

Geocode.setApiKey("AIzaSyA5XosDPFC34pun--KQkismaRS7V1u5bns");



const api = {
    // key: "429736441cf3572838aa10530929f7cd",
    key: "6557810176c36fac5f0db536711a6c52",
    base: "https://api.openweathermap.org/data/2.5"
  }  

function App() {    
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState("");
        
    // Get latitude & longitude from address from Google API
    // Then Get onecall weather API from OpenWeatherMap.org
    const searchStart = evt => { 
        if (evt.key === "Enter") {
            Geocode.fromAddress(query)
                .then(async (response) => {
                    const lat = await (Math.round(response.results[0].geometry.location.lat));
                    const lng = await (Math.round(response.results[0].geometry.location.lng));                 
                    console.log(lat, lng);  
                    fetch(`${api.base}/onecall?lat=${lat}&lon=${lng}&exclude={part}&units=metric&appid=${api.key}`)
                    .then(res => res.json())
                    .then(result => {
                      setWeather(result);
                      setLocation(query)
                      setQuery('');
                      console.log(result);
                  });
                },
                (error) => {
                    console.error(error);
                }
            ) ;
        }
    }

        
    // Get current date
    const dateBuilder = (d) => {
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
    
      return `${day} ${date} ${month} ${year}`
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
            
    
    return (
        <div style={{ backgroundImage: `url(${background})` }}>
        <div className="search-box">
            <h2>Edge Weather</h2>
            <input text="text" placeholder="Enter search location..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={searchStart}/>
        </div>                              

                {(typeof weather.current != "undefined") ? (
                    <div>

                        <div className="date-box">
                            <div className="location">{capitalizeFirstLetter(location)}</div> 
                            <div className="date">{dateBuilder(new Date())}</div>                            
                        </div>
                        
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.current.temp)}&deg;
                            </div>
                            <div className="feels-like">
                                Feels like {Math.round(weather.current.feels_like)}&deg;
                            </div>
                            <div className="weather-desc">
                                <img src={`https://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`} alt="Weather Icon" width="150px" height="150px"/>
                                {weather.current.weather[0].description}
                            </div>
                        </div>

                        <div>
                            <div className="forecast-list">
                                <ul className="forecast-box">
                                    <li className="forecast-box-list-li">
                                        <div className="forecast-day">
                                            {moment((weather.daily[1].dt)*1000).format("dddd")}
                                        </div>
                                        <div className="forecast-img">
                                            <img height="100" width="100" src={`https://openweathermap.org/img/w/${weather.daily[1].weather[0].icon}.png`} alt="Weather Icon" />
                                        </div>
                                        <div className="forecast-temp">
                                            {Math.round(weather.daily[1].temp.min)}&deg;/
                                            {Math.round(weather.daily[1].temp.max)}&deg;
                                        </div>
                                    </li >
                                    <li className="forecast-box-list-li">
                                        <div className="forecast-day"> 
                                            {moment((weather.daily[2].dt)*1000).format("dddd")}
                                        </div>
                                        <div className="forecast-img">
                                            <img height="100" width="100" src={`https://openweathermap.org/img/w/${weather.daily[2].weather[0].icon}.png`} alt="Weather Icon" />
                                        </div>
                                        <div className="forecast-temp">
                                            {Math.round(weather.daily[2].temp.min)}&deg;/
                                            {Math.round(weather.daily[2].temp.max)}&deg;
                                        </div>
                                    </li>
                                    <li className="forecast-box-list-li">
                                        <div className="forecast-day"> 
                                            {moment((weather.daily[3].dt)*1000).format("dddd")}
                                        </div>
                                        <div className="forecast-img">
                                            <img height="100" width="100" src={`https://openweathermap.org/img/w/${weather.daily[3].weather[0].icon}.png`} alt="Weather Icon" />
                                        </div>
                                        <div className="forecast-temp">
                                            {Math.round(weather.daily[3].temp.min)}&deg;/
                                            {Math.round(weather.daily[3].temp.max)}&deg;
                                        </div>
                                    </li>
                                    <li className="forecast-box-list-li">
                                        <div className="forecast-day"> 
                                            {moment((weather.daily[4].dt)*1000).format("dddd")}
                                        </div>
                                        <div className="forecast-img">
                                            <img height="100" width="100" src={`https://openweathermap.org/img/w/${weather.daily[4].weather[0].icon}.png`} alt="Weather Icon" />
                                        </div>
                                        <div className="forecast-temp">
                                            {Math.round(weather.daily[4].temp.min)}&deg;/
                                            {Math.round(weather.daily[4].temp.max)}&deg;
                                        </div>
                                    </li>
                                    <li className="forecast-box-list-li">
                                        <div className="forecast-day"> 
                                            {moment((weather.daily[5].dt)*1000).format("dddd")}
                                        </div>
                                        <div className="forecast-img">
                                            <img height="100" width="100" src={`https://openweathermap.org/img/w/${weather.daily[5].weather[0].icon}.png`} alt="Weather Icon" />
                                        </div>
                                        <div className="forecast-temp">
                                            {Math.round(weather.daily[5].temp.min)}&deg;/
                                            {Math.round(weather.daily[5].temp.max)}&deg;
                                        </div>
                                    </li>
                                    <li className="forecast-box-list-li">
                                        <div className="forecast-day"> 
                                            {moment((weather.daily[6].dt)*1000).format("dddd")}
                                        </div>
                                        <div className="forecast-img">
                                            <img height="100" width="100" src={`https://openweathermap.org/img/w/${weather.daily[6].weather[0].icon}.png`} alt="Weather Icon" />
                                        </div>
                                        <div className="forecast-temp">
                                            {Math.round(weather.daily[6].temp.min)}&deg;/
                                            {Math.round(weather.daily[6].temp.max)}&deg;
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>

                    </div>
                ) : ('')}

        <Container
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}>
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
    )
}

export default App;
