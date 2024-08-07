let mainDiv = document.querySelector('.main');
let searchInput = document.querySelector('#searchInput');
let searchButton = document.querySelector('#searchButton');
let allData = document.querySelector('.allData');
let loaderBox = document.querySelector('.loaderBox');
let myAPI_key = '13c34acc87a5f0efc6e2bf5854ae8a71';

function fetchAPI() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${myAPI_key}`;

    loaderBox.style.display = 'flex'
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            getData(data)
            setTimeout(() => {
                loaderBox.style.display = 'none'
            }, 500);
        })
        .catch((err) => {
            loaderBox.style.display = 'none'
        })
}

function getData(data) {
    if(data.main){
        // calculating time
        console.log(data)
        let currTime = new Date().toLocaleTimeString()
        let currDate = new Date().toLocaleDateString()
        // destructuring data
        const { temp, feels_like } = data.main
        const { country } = data.sys
        const { main, icon } = data.weather[0]
        const { name } = data
        allData.innerHTML = `
        <p>${name}, ${country}, ${currTime}  </p>
        <div class="clipArt"><img src="https://openweathermap.org/img/wn/${icon}@4x.png" /></div>
        <div class="temperature"> <h1>${Math.round(temp)} <sup>o</sup>C </h1>
        <p>${main}</p>
        <p>Feels like ${feels_like}</p>
        </div>
        `

        // backgroundImage
        let bgObject = {
            Clouds: 'dark_clouds.gif',
            Rain:'rain.webp',
            Smoke:'smoke.jpeg',
            Clear:'normal.gif',
            Thunderstorm: 'thunder.gif',
            Haze:'smoke.jpeg',
            Fog:'smoke.jpeg',
            Dust:'smoke.jpeg'
        }
        mainDiv.style.backgroundImage = `url(./assets/images/${bgObject[main]})`
        console.log(bgObject[main])
    } else{
        mainDiv.style.backgroundImage = 'none'
        allData.innerHTML = `<p>${data.message}</p>`
    }
}


searchButton.onclick = () => {
    fetchAPI()
}


let dataCopied = {
    "coord": {
        "lon": 67.7763,
        "lat": 26.7329
    },
    "weather": [
        {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 40.85,
        "feels_like": 47.48,
        "temp_min": 40.85,
        "temp_max": 40.85,
        "pressure": 991,
        "humidity": 35,
        "sea_level": 991,
        "grnd_level": 986
    },
    "visibility": 10000,
    "wind": {
        "speed": 6.49,
        "deg": 163,
        "gust": 5.65
    },
    "rain": {
        "1h": 1.54
    },
    "clouds": {
        "all": 16
    },
    "dt": 1722258882,
    "sys": {
        "country": "PK",
        "sunrise": 1722214321,
        "sunset": 1722262709
    },
    "timezone": 18000,
    "id": 1180809,
    "name": "Dadu",
    "cod": 200
}
