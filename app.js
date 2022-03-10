window.addEventListener('load', ()=>{

    const getDate = () =>{
        let date = new Date();
        return `${date.getDate()}-${('0' + (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`;
    }
    let lon
    let lat
    let temperaturaValor = document.getElementById('temperature')
    let temperaturaDescripcion = document.getElementById('description')
    let ubicacion = document.getElementById('location')
    let presion = document.getElementById('pressure')
    let humedad = document.getElementById('humidity')
    let fecha = document.getElementById('date')
   // let iconoAnimado = document.getElementById('icono-animado')
    const cleanUp = () =>{
    let container = document.getElementById('contenedor');
    let btnVolver = document.getElementById('contenedor-btn-v')
    let loader = document.getElementById('loader');
    loader.style.display='none';
    container.style.display='flex';    
    btnVolver.style.display='flex';
    }
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(posicion=>{            

            const API_KEY = '7fe4e12051ef7e6cd24e85d6d567f24b';
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            const url = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es`

            fetch(url)
            .then(response => response.json())
            .then(data => {
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ºC`
                
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                
                ubicacion.textContent = data.name                
                fecha.textContent = getDate()

                humedad.textContent = data.main.humidity
                presion.textContent = data.main.pressure

                //para iconos dinámicos
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }
                  cleanUp();
                
            })
            .catch(error=>{
                console.log(error)
            })
        })
    }
})