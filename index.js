const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weather = document.querySelector('.weather');
const details = document.querySelector('.details');
const fourohfour = document.querySelector('.fourohfour');

search.addEventListener('click', () => {
//    getWeather();
//});

//search.addEventListener('keypress', (event) => {
//    if (event.keyCode === 13) {
//        getWeather();
 //   }
//});

//function getWeather(){
    const APIkey = 'c8cad648cf2669b39d83e3f1aa8e75a3'
    const city = document.querySelector('.search input').value;
    if (city === '' ){
        fourohfour.style.display = 'none';
        weather.style.display = 'none';
        details.style.display = 'none';
        container.style.height = '50px';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
    &units=imperial&appid=${APIkey}`).then(response => response.json()).then
    (json => {
        if(json.cod === '404'){
            container.style.height = '600px';
            weather.style.display = 'none';
            details.style.display = 'none';
            fourohfour.style.display = 'flex';
            fourohfour.classList.add('fade-in')
            return;
        }

        fourohfour.style.display = 'none';

        const image = document.querySelector('.weather img');
        const temp = document.querySelector('.weather .temp');
        const desc = document.querySelector('.weather .desc');
        const humidity = document.querySelector('.details .hum span');
        const wind = document.querySelector('.details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'sunny.png';
                break;
            case 'Clouds':
                image.src = 'cloud.png';
                break;
            case 'Rain':
                image.src = 'rain.png';
                break;
            default:
                image.src = '';
                break;
        }
        
        temp.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
        desc.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}<span>%</span>`;
        wind.innerHTML = `${json.wind.speed}<span>mph</span>`;

        weather.style.display = 'flex';
        details.style.display = 'flex';
        weather.classList.add('fade-in');
        details.classList.add('fade-in');
        container.style.height = '600px';
        
    });
//}
});
    
