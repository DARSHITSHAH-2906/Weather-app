const map = L.map("map").setView([20.2096492 , 73.0995222] , 10);
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)
let marker;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude , longitude} = position.coords;
        console.log(latitude , longitude);
        map.setView([latitude ,longitude] , 18);
        // map.removeLayer(marker);
        marker = L.marker([latitude , longitude]).addTo(map);
        console.log(marker)
    } , 
    (error)=>{
        alert(error);
    } , {
        enableHighAccuracy:true
    })
}

const city_name = document.getElementById("city_name");
const get_btn = document.getElementById("get_city");

get_btn.addEventListener("click" , async ()=>{
    const city = city_name.value;
    if(city){
        try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=71257496aefd9fe93eb1b0f3b1ea0e29&units=metric`);
            const data = await res.json();
            city_name.value="";
            if(res.status!==200){
                alert(data.message);
                return;
            }
            console.log(data);
    
            const {coord , weather , main , wind , sys , name} = data;
    
            map.setView([coord.lat ,coord.lon] , 15);
            map.removeLayer(marker);
            marker = L.marker([coord.lat  , coord.lon ]).addTo(map);
    
            document.querySelector(".icon").src=`https://openweathermap.org/img/wn/${weather[0].icon}.png`;
            document.querySelector(".description").textContent = weather[0].description;
            document.querySelector(".country").textContent = `Country: ${sys.country}`
            document.querySelector(".region").textContent = `Region: ${name}`
            document.querySelector(".degree-celsius").textContent = `Temperature: ${main.temp}`
            document.querySelector(".humidity").textContent = `Humidity:${main.humidity}`;
            document.querySelector(".w1").textContent = `Wind Speed:${wind.speed}kph`;
            document.querySelector(".w2").textContent = `Wind Degree:${wind.deg}`;
            document.querySelector(".p1").textContent = `Pressure:${main.pressure} mb`;
            document.querySelector(".g1").textContent = `Gust:${wind.gust} kph`;
        }catch(error){
            alert(error);
        }
    } else{
        alert("Enter valid city name");
    }
    
});


