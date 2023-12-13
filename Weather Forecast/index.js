const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");

function updateClock(){
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let ampm = "AM"

    if(h > 12){
        h = h - 12;
        ampm = "PM";
    }

    h = h < 10 ? "0"+ h : h;
    m = m < 10 ? "0"+ m : m;
    s = s < 10 ? "0"+ s : s;

    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    ampmEl.innerText = ampm;
    setTimeout(()=>{
        updateClock()
    },1000)
}

updateClock();

const monthEl = document.querySelector(".date h1");
const fullDateEl = document.querySelector(".date p");
const daysEl = document.querySelector(".days");

const monthInx = new Date().getMonth();

const lastDay = new Date(new Date().getFullYear(), monthInx +1 , 0).getDate();
const firstDay = new Date(new Date().getFullYear(), monthInx , 1).getDay() -1 ;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

monthEl.innerText = months[monthInx];
fullDateEl.innerText = new Date().toDateString();


let days = "";

for (let i = firstDay; i>0; i--){
    days += `<div class="empty"></div>`
}

for (let i=1;i<=lastDay;i++){
    if( i === new Date().getDate()){
        days += `<div class="today">${i}</div>`;
    }
    else{
        days += `<div>${i}</div>`;
    }
}

daysEl.innerHTML = days;

let weather = {
   apiKey: "37cc2f5868d1bc298c9eb1553f7c40bf",
   fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data){
        const { name } = data;
        const { icon, description }= data.weather[0];
        const { temp, humidity }= data.main;
        const { speed }= data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading")
       
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

document.querySelector(".search button")
.addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar")
.addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }

});

weather.fetchWeather("Guwahati");
