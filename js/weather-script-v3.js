// Declaración de variables
const apiKeyOpenW = '';
// const apiKeyPexels = '';
let boton = document.querySelector('#envia');


// Consultar por la ubicación actual del usuario
window.addEventListener('DOMContentLoaded', ()=>{

    let temperaturaValor = document.querySelector('#temperatura-valor');
    let temperaturaDescripcion = document.querySelector('#temperatura-descripcion');
    let ubicacion = document.querySelector('#ubicacion');
    let iconoDom = document.querySelector('#icono-animado');
    let vientoVelocidad = document.querySelector('#viento-velocidad');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (posicion) =>{
            console.log(posicion);
            console.log(posicion.coords.latitude);
            console.log(posicion.coords.longitude);
            let longitud = posicion.coords.longitude;
            let latitud = posicion.coords.latitude;
            const llamada = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKeyOpenW}&units=metric&lang=es`;

            try {
                const response = await fetch(llamada);
                const datos = await response.json();
                
                let temperatura = Math.round(datos.main.temp);
                temperaturaValor.textContent = `${temperatura} °C`; // ALT 0176
                ubicacion.textContent = datos.name;
                temperaturaDescripcion.textContent = datos.weather[0].description.toUpperCase();
                let icono = datos.weather[0].main;
                iconoDom.src = obtenerIcono(icono);
                vientoVelocidad.textContent = `${datos.wind.speed} m/s`;

            } catch (error) {
                console.error('Error en la solicitud: ',error);
            }
            // fetch(llamada)
            //     .then (response => response.json())
            //     //  .then (json => console.log(json))
            //     .then (datos =>{
            //         let temperatura = Math.round(datos.main.temp);
            //         temperaturaValor.textContent = `${temperatura} °C`;
            //         ubicacion.textContent = datos.name;
            //         temperaturaDescripcion.textContent = datos.weather[0].description.toUpperCase();
            //         let icono = datos.weather[0].main;
            //         iconoDom.src = obtenerIcono(icono);
            //         vientoVelocidad.textContent = `${datos.wind.speed} m/s`;
            //     })
            //     .catch(err => console.log('Error: ', err));
        });
}
});

// Función para obtener el icono animado
const obtenerIcono = (icono) =>{
    switch (icono){
        case 'Clouds':
            return 'img/cloudy-day-1.svg';
        case 'Clear':
            return 'img/day.svg';
        case 'Snow':
            return 'img/snowy-1.svg';
        case 'Rain':
            return 'img/rainy-1.svg';
        case 'Drizzle':
            return 'img/rainy-1.svg';
        case 'Thunderstorm':
            return 'img/thunder.svg';
        case 'Atmosphere':
            return 'img/weather.svg';                   
        default:
            return 'img/weather_sunset.svg';  
    }
}


// Evento para que escuche la entrada del usuario    
window.addEventListener('keyup', (event) =>{
    if (event.key === 'Enter'){
        let ciudad = document.querySelector('#consultaTiempo').value;
        let resultadoValidacion = validarCiudad(ciudad);
        if (resultadoValidacion = true){
            console.log('Eureka!!!');
        }else{
            console.log('NO');
        }
    }
});

boton.addEventListener('click', () =>{
    let ciudad = document.querySelector('#consultaTiempo').value;
    let resultadoValidacion = validarCiudad(ciudad);
    if (resultadoValidacion){
        console.log('Eureka!!!');
        app();
    }else{
        console.log('NO');
    }
});



// Función de validación de la entrada del usuario
function validarCiudad(ciudad){
    console.log(ciudad);
    let entrada = document.querySelector('#consultaTiempo');
    let spanError = document.querySelector('#entradaError');
    let expresio = /^[a-zA-Zà-ÿ ]{1,120}$/; 

    if (ciudad == null || ciudad.length == 0 || !expresio.test(ciudad)){
        console.log(expresio.test(ciudad));
        spanError.innerHTML = 'Introduce el nombre de una ciudad, por favor ';
        spanError.className = 'error';
        entrada.className = 'borderror';
        return false;
    }else{
        spanError.className = 'noError';
        entrada.className = 'noborderror';
        console.log(`Entrada correcta`);
        return true;
    }
}

async function app(){
    console.log('Paty está de los nervios');
    let llamadaCiudad = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKeyOpenW}&units=metric&lang=es`;
    let temperaturaValorCiudad = document.querySelector('#temp-valor-ciudadUsuario');
    let temperaturaDescripcionCiudad = document.querySelector('#temp-desc-ciudadUsuario');
    let ubicacionCiudad = document.querySelector('#ubicacion-ciudadUsuario');
    let iconoDomCiudad = document.querySelector('#icono-animado-ciudadUsuario');
    let vientoVelocidadCiudad = document.querySelector('#windSpeed-ciudadUsuario');

    try {
        const response = await fetch(llamadaCiudad);
        const datos = await response.json();
        temperaturaValorCiudad.textContent = `${Math.round(datos.main.temp)} °C`; // ALT 0176
        ubicacionCiudad.textContent = datos.name;
        temperaturaDescripcionCiudad.textContent = datos.weather[0].description.toUpperCase();
        iconoDomCiudad.src = obtenerIcono(datos.weather[0].main);
        vientoVelocidadCiudad.textContent = `${datos.wind.speed} m/s`;
    
    } catch (error) {
        console.error('Error en la solicitud: ',error);
    }

    }



