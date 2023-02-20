const container = document.querySelector('.container');
const search = document.querySelector('.search');
const weather = document.querySelector('.weather');
const details = document.querySelector('.details');
const fourohfour = document.querySelector('.fourohfour');

search.addEventListener('click', () => {
    const APIkey = 'c8cad648cf2669b39d83e3f1aa8e75a3'
    const city = document.querySelector('.search input').value;
    if (city === '' ){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
    &appid=${APIkey}`).then(response => response.json()).then
    (json => {
        if(json.code === 404){
            container.style.height = '600px';
            weather.style.display = 'none';
            details.style.display = 'none';
            fourohfour.style.display = 'flex';
            //fourohfour.classList.add
            return;
        }

        fourohfour.style.display = 'none';

        const image = document.querySelector('.weather img');
        const temp = document.querySelector('.weather .temp');
        const desc = document.querySelector('.weather .desc');
        const humidity = document.querySelector('.details .humidity');
        const wind = document.querySelector('.details .wind');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'clear.png';
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
        
        temp.innerHTML = '${parseInt(json.main.temp}<span>°C</span>';
        desc.innerHTML = json.weather[0].description;
        humidity.innerHTML = '${json.main.humidity}<span>%</span>';
        wind.innerHTML = '${json.wind.speed}<span>km/h</span>';

        weather.style.display = 'flex';
        details.style.display = 'flex';
        container.style.height = '600px';
        

    });

});