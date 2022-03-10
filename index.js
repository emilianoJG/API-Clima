const API_KEY = '7fe4e12051ef7e6cd24e85d6d567f24b';

const fetchData = position =>{
    const{latitude, longitude} = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWatherData(data))
}

const setWatherData = data =>{
    console.log(data)
    //datos obtenidos para mostrar en html con los mismos nombres de ID
    const weatherData ={
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    //envio de datos a html
    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp();
}

const cleanUp = () =>{
    let container = document.getElementById('container');
    let btnVolver = document.getElementById('container-btn-v')
    let loader = document.getElementById('loader');
    loader.style.display='none';
    container.style.display='flex';
    btnVolver.style.display='flex';
}

const getDate = () =>{
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad= () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

