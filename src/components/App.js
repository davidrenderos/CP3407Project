import React, {useState} from "react";
import Signup from "./Signup";
import {Container, FormControl, InputGroup, Nav, Navbar} from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import './App.css'
import Geocode from "react-geocode";
import moment from 'moment';
import Contact from "./Contact";
import rainwear from "./assets/rainwear.jpg";
import sunwear from "./assets/sunwear.jpg";
import snowwear from "./assets/snowwear.jpg";
import airquality from "./assets/airquality.jpg";


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
    const [weather2, setWeather2] = useState("");
    // const {currentUser} = useAuth()

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
                        fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=a1c61cc31ab047dfb0d1bedfd86824b3&include=minutely`)
                            .then(res2 => res2.json())
                            .then(result2 => {
                                setWeather2(result2);
                                console.log(result2);
                                fetch(`${OPENWEATHER_API.base}/onecall?lat=${lat}&lon=${lng}&exclude={part}&units=metric&appid=${OPENWEATHER_API.key}`)
                                    .then(res => res.json())
                                    .then(result => {
                                        setWeather(result);
                                        setQuery('');
                                        console.log(result);
                                        setError("");
                                    });
                            });
                    },
                    (error) => {
                        console.error(error);
                        setError("Error - type valid location");
                    }
                );
        }
    }

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    function combTemp() {
        const tempOWM = parseFloat(weather.current.temp);
        const tempWB = parseFloat(weather2.data[0].temp);
        return Math.round((tempOWM + tempWB) / 2);
    }

    function getAdviceImage(id_weather_desc) {
        if (id_weather_desc >= 200 && id_weather_desc <= 531) {
            var imagesrc=rainwear;
        }
        if (id_weather_desc >= 600 && id_weather_desc <= 622) {
            imagesrc=snowwear;
        }
        if (id_weather_desc >= 711 && id_weather_desc <= 731) {
            imagesrc=airquality;
        }
        if ( id_weather_desc >= 751 && id_weather_desc <= 762) {
            imagesrc=airquality;
        }
        if (id_weather_desc >= 800 && id_weather_desc <= 804) {
            imagesrc=sunwear;
        }
        return imagesrc;
    }

    function getAdviceText(id_weather_desc) {
        if (id_weather_desc >= 200 && id_weather_desc <= 531) {
           var adviceText="Umbrella and Raincoats needed";
        }
        if (id_weather_desc >= 600 && id_weather_desc <= 622) {
            adviceText="Warm Clothing and Layer Up";
        }
        if (id_weather_desc >= 711 && id_weather_desc <= 731) {
            adviceText="Caution Poor Atmosphere Conditions";
        }
        if ( id_weather_desc >= 751 && id_weather_desc <= 762) {
            adviceText="Caution Poor Atmosphere Conditions";
        }
        if (id_weather_desc >= 800 && id_weather_desc <= 804) {
            adviceText="Sun or Cloud - Protect against UV rays";
        }
        return adviceText;
    }



    return (
        <div>
            <Container>
                <Navbar className="color-nav" variant="light" fixed="top" >
                    <Navbar.Brand style={{fontsize:"100px"}}>Edge Weather</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#search">Search</Nav.Link>
                        <Nav.Link href="#cred">Sign In/Up</Nav.Link>
                        <Nav.Link href="#feedback">Feedback</Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
            <div id="search" className="top-box">
                <Container>
                    <div className="search-bar" style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100vh',
                    }}>
                        <InputGroup>
                            <FormControl onChange={e => setQuery(e.target.value)} value={query} onKeyPress={searchStart}
                                         style={{fontSize: "2.5vw", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px"}}
                                         placeholder="Please enter a search location"
                                         aria-label="Please enter a search location"
                                         aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                        <h5>{error}</h5>
                    </div>
                </Container>
            </div>

            {(typeof weather.current != "undefined") ? (

                // weather card starts
                <div>
                    <div id="your-weather" className="card card-weather">
                        <div className="card-body">
                            <div class="row">
                                <div class="col-12 col-md-4">
                                    <div class="weather-date-location">
                                        <h5><span class="weather-date"/> <span
                                            class="weather-location">{location}</span></h5>
                                        <h3 class="text-white">{moment((weather.current.dt) * 1000).format("dddd")}</h3>
                                        <p class="text-white"><span
                                            class="weather-date">{moment((weather.current.dt) * 1000).format("MMMM Do YYYY")}</span>
                                        </p>
                                        <p class="text-white"><span
                                            class="weather-date">{moment((weather.current.dt) * 1000).format("LT")}</span>
                                        </p>
                                        <div class="description">
                                            <img
                                                src={`https://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`}
                                                alt="Weather Icon" width="150px" height="150px"/>
                                            <h5> {titleCase(weather.current.weather[0].description)}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="weather-data">
                                        <div class="temp">
                                            <h4 class="display-3">{combTemp()}&deg;</h4>
                                            <h5 class="text-gray"> Feels
                                                like {Math.round(weather.current.feels_like)}&deg;</h5>
                                            <p class="min-max">{Math.round(weather.daily[0].temp.min)}&deg; Min
                                                / {Math.round(weather.daily[1].temp.max)}&deg; Max</p>
                                            <img src={getAdviceImage(weather.current.weather[0].id)} alt="Advice on clothing" width="200px" height="200px"/> 
                                            <p>{getAdviceText(weather.current.weather[0].id)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="extras">
                                        <h5 class="text-gray">Rain {weather2.data[0].precip} mm</h5>
                                        <p></p>
                                        <h5 class="text-gray">Wind - {weather.daily[0].wind_speed} m/s</h5>

                                        <p></p>
                                        <h5 class="text-gray">Gusts - {weather.daily[0].wind_gust} m/s</h5>
                                        <p></p>
                                        <h5 class="text-gray">Humidity - {weather.daily[0].humidity} %</h5>
                                        <p></p>
                                        <h5 class="text-gray">UV Index - {Math.round(weather.daily[0].uvi)}</h5>
                                        <h5 class="text-gray">Air Quality Index - {weather2.data[0].aqi}</h5>
                                        <p></p>
                                        <h5 class="text-gray">Sunrise
                                            - {moment((weather.daily[0].sunrise) * 1000).format("LT")}</h5>
                                        <h5 class="text-gray">Sunset
                                            - {moment((weather.daily[0].sunset) * 1000).format("LT")}</h5>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="d-flex weekly-weather">
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[1].dt) * 1000).format("dddd")} </p>
                                    <img height="80" width="80"
                                         src={`https://openweathermap.org/img/w/${weather.daily[1].weather[0].icon}.png`}
                                         alt="Weather Icon"/>
                                    <p class="mb-0"> {Math.round(weather.daily[1].temp.min)}&deg;/
                                        {Math.round(weather.daily[1].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[1].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[2].dt) * 1000).format("dddd")} </p>
                                    <img height="80" width="80"
                                         src={`https://openweathermap.org/img/w/${weather.daily[2].weather[0].icon}.png`}
                                         alt="Weather Icon"/>
                                    <p class="mb-0"> {Math.round(weather.daily[2].temp.min)}&deg;/
                                        {Math.round(weather.daily[2].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[2].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[3].dt) * 1000).format("dddd")} </p>
                                    <img height="80" width="80"
                                         src={`https://openweathermap.org/img/w/${weather.daily[3].weather[0].icon}.png`}
                                         alt="Weather Icon"/>
                                    <p class="mb-0"> {Math.round(weather.daily[3].temp.min)}&deg;/
                                        {Math.round(weather.daily[3].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[3].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[4].dt) * 1000).format("dddd")} </p>
                                    <img height="80" width="80"
                                         src={`https://openweathermap.org/img/w/${weather.daily[4].weather[0].icon}.png`}
                                         alt="Weather Icon"/>
                                    <p class="mb-0"> {Math.round(weather.daily[4].temp.min)}&deg;/
                                        {Math.round(weather.daily[4].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[4].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[5].dt) * 1000).format("dddd")} </p>
                                    <img height="80" width="80"
                                         src={`https://openweathermap.org/img/w/${weather.daily[5].weather[0].icon}.png`}
                                         alt="Weather Icon"/>
                                    <p class="mb-0"> {Math.round(weather.daily[5].temp.min)}&deg;/
                                        {Math.round(weather.daily[5].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[5].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[6].dt) * 1000).format("dddd")} </p>
                                    <img height="80" width="80"
                                         src={`https://openweathermap.org/img/w/${weather.daily[6].weather[0].icon}.png`}
                                         alt="Weather Icon"/>
                                    <p class="mb-0"> {Math.round(weather.daily[6].temp.min)}&deg;/
                                        {Math.round(weather.daily[6].temp.max)}&deg; </p>
                                    <p class="msp-3">{titleCase(weather.daily[6].weather[0].description)}</p>
                                </div>
                                <div class="weekly-weather-item">
                                    <p class="mb-1"> {moment((weather.daily[7].dt) * 1000).format("dddd")} </p>
                                    <img height="80" width="80"
                                         src={`https://openweathermap.org/img/w/${weather.daily[7].weather[0].icon}.png`}
                                         alt="Weather Icon"/>
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
            <div id="cred">
                <Container
                    className="d-flex align-items-center justify-content-center"
                    style={{MinHeight: "100vh"}}>
                    <div className="w-100" style={{maxWidth: "400px", paddingTop: "150px"}}>
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
                <div/>
            </div>
            <div id="feedback">
                <Container
                    className="d-flex align-items-center justify-content-center"
                    style={{minHeight: "100vh"}}>
                    <div className="w-100" style={{maxWidth: "800px"}}>
                        <Contact/>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default App;
