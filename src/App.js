import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Clouds from './images/clouds.png'
import lgtRain from './images/lgtRain.png'
import Rain from './images/rain.png'
import Sunny from './images/sunny.png'

const api = {
  key: "2019a24bf77fd34b8c3b88b01b6fadc9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16)
       ? 'app warm' 
       : 'app') 
       : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box-today">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
              <div className="minmax">Min {Math.round(weather.main.temp_min)}°c<br>
              </br> Max {Math.round(weather.main.temp_max)}°c</div>
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="forecast-box">5 Day Forecast</div>
            <br>
            </br>
            <Container>
              <Row md={5}>
                <Col><div className="weather-box-tomo">
                  <div className="day">Sat</div>
                  <div className='temp-tomo'>
                    <img src={Clouds} alt='clouds'></img>
                  </div>
                  </div></Col>
                
                <Col><div className="weather-box-tomo">
                <div className="day">Sun</div>
                  <div className='temp-tomo'>
                  <img src={Sunny} alt='clouds'></img>
                  </div>
                  </div></Col>
                               
                <Col><div className="weather-box-tomo">
                <div className="day">Mon</div>
                  <div className="temp-tomo">
                  <img src={lgtRain} alt='clouds'></img>
                  </div>
                  </div></Col>
                
                <Col><div className="weather-box-tomo">
                <div className="day">Tue</div>
                  <div className="temp-tomo">
                  <img src={Clouds} alt='clouds'></img>
                  </div>
                  </div></Col>

                <Col><div className="weather-box-tomo">
                <div className="day">Wed</div>
                  <div className="temp-tomo">
                  <img src={Rain} alt='clouds'></img>
                  </div>
                </div></Col>
              </Row>
            </Container>                  
            </div>     
            
        ) : ('')}
      </main>
    </div>
  );
}

export default App;