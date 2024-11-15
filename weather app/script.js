const map = L.map("map").setView([20.2096492 , 73.0995222] , 10);
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)
let marker = L.marker([20.2096492  , 73.0995222]).addTo(map);

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude , longitude} = position.coords;
        map.setView([latitude ,longitude] , 18);
        map.removeLayer(marker);
        marker = L.marker([latitude , longitude]).addTo(map);
    } , 
    (error)=>{
        alert(error);
    } , {
        enableHighAccuracy:true
    })
}

async function get_data(city){
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=0960505744194bcc8c051854241511&q=${city}&aqi=no`);

    return await res.json();
}

const city_name = document.getElementById("city_name");
document.getElementById("get_city").addEventListener("click" , async ()=>{
    const city = city_name.value;
    if(city){
        const res = await get_data(city);
        map.setView([res.location.lat ,res.location.lon] , 16);
        map.removeLayer(marker);
        marker = L.marker([res.location.lat , res.location.lon]).addTo(map);
        document.querySelector(".degree-celsius").innerText = `Celsius: ${res.current.temp_c}`
        document.querySelector(".degree-fahrenheit").innerText = `Fahrenheit: ${res.current.temp_f}`
        document.querySelector(".humidity").innerText = `${res.current.humidity}`;
        document.querySelector(".wind").innerText = `${res.current.wind_kph}kph`;
        console.log(`Lat : ${res.location.lat} , Long : ${res.location.lon}`)
    } else{
        alert("Enter valid city name");
    }
    
})





