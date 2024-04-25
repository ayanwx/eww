import { readFileSync } from "fs";
import { join } from "path";

const getConfig = () => {
    let config;
    
    try {
        config = JSON.parse(readFileSync(join(process.env.HOME, ".eww-weather.json")));    
    } catch(e) { config = e.name; }

    return config;
}

const getCurrentWeather = () => {
    const config = getConfig();

    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${config.lat}&lon=${config.lon}&units=${config.units}&appid=${config.appid}`)
           .then((response) => response.json())
           .then((body) => {
                process.stdout.write(JSON.stringify(body));
           })
    } catch(e) { process.stdout.write(e.name); }
}

const getForecast = () => {
    const config = getConfig();

    try {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${config.lat}&lon=${config.lon}&appid=${config.appid}`)
           .then((response) => response.json())
           .then((body) => {
                process.stdout.write(JSON.stringify(body));
           })
    } catch(e) { process.stdout.write(e.name); }
}

getForecast();

//fetch('https://api.openweathermap.org/data/2.5/weather?lat=23.747&lon=89.63&units=metric&appid=1a7c818927225231cf3fd2a78295dee0')
//    .then((response) => response.text())
//    .then((body) => {
//        console.log(body);
//    });