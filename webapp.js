// 35ff3ab2380927a84e46ac9b4734da9f

// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=35ff3ab2380927a84e46ac9b4734da9f
let input_value = "tel aviv";
const today = new Date();
let clock = today.toLocaleTimeString();
let cerent_time = "";
let int_curent_hours = parseInt(clock.slice(0, 2));

let wind_speed = "";
let i = 0;


let degree_js = "";
let humidity_value = "";
let sky_description_js = "";
let weather_id_js = "";
let weather_id = "";
let dgree_js = "";
let slider_time = "";
let tomarowday_api = "";
let thirdday_api = "";
let forthday_api = "";
let fithtday_api = "";
let curennt_num_day = today.getDay();
let translate_bool = false;


const all_wether_day = document.querySelectorAll("wether_day");
const all_days = document.querySelectorAll(".day");
const all_degrees = document.querySelectorAll(".degre_day");
const all_scale = document.querySelectorAll(".scale");
const all_day_img = document.querySelectorAll(".day_img");
// all_wether_day.forEach(day=>{
//   const dayelement=day.querySelectorAll("day")
// })

const tomaroww = all_days[0];
const tomaroww_degree = all_degrees[0];
const tomaroww_scale = all_scale[0];
const tomaroww_img = all_day_img[0];

const third_day = all_days[1];
const third_day_degree = all_degrees[1];
const third_day_scale = all_scale[1];
const third_day_img = all_day_img[1];

const forth_day = all_days[2];
const forth_day_degree = all_degrees[2];
const forth_day_scale = all_scale[2];
const forth_day_img = all_day_img[2];

const fitht_day = all_days[3];
const fitht_day_degree = all_degrees[3];
const fitht_day_scale = all_scale[3];
const fitht_day_img = all_day_img[3];

const slider_js = document.querySelector("slider");
const output_slider_js = document.querySelector("output");
const inputElement = document.querySelector(".input");
let body_Image = document.querySelector("body");
let dgree = document.querySelector(".main_degrees");
const loction = document.querySelector("h2");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#moist");
let all_h1 = document.querySelectorAll("h1");
let sky_description = all_h1[0];
const main_img = document.querySelector(".simbol");
let main_img_js = null;
let lang = "he";
let units = "imperial";
let all_checkbox = document.querySelectorAll(".checkbox");
all_checkbox[0].style.width = "100%";
all_checkbox[1].style.width = "100%";

weather_forecast_degrees = [-10, 0, 10, 20, 30, 40];

all_checkbox[1].addEventListener("change", function () {
  if (all_checkbox[1].checked) {
    lang = "en";
    run_the_page();
    translate_bool = false;
  } else {
    lang = "he";
    run_the_page();
    translate_bool = true;
  }
});
// units shit
all_checkbox[0].addEventListener("change", function () {
  if (all_checkbox[0].checked) {
    units = "metric";
    run_the_page();
  } else {
    units = "imperial";
    run_the_page();
  }
});

async function api_obj_wether(city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&APPID=35ff3ab2380927a84e46ac9b4734da9f&lang=${lang}&exclude=hourly,daily`
  );
  return await response.json();
}
// clock shit
function clock_func() {
  return clock.slice(0, 5);
}
setInterval(clock_func(), 60000);
{
  cerent_time = clock_func();
}

// slider_shit
let timevalue = [];
for (let j = 0; j < 9; j++) {
  if (j !== 0) {
    int_curent_hours += 3;
  }

  if (int_curent_hours > 23.5) {
    int_curent_hours = 0;
  }

  timevalue.push(int_curent_hours);
}

slider.addEventListener("input", slider_control);
function slider_control() {
  let index = parseInt(slider.value);
  slider_time = `Time${timevalue[index]}:00`;
  output.innerText = slider_time;

  return index;
}
slider.addEventListener("input", function () {
  run_the_page();
});

document.addEventListener("DOMContentLoaded", run_the_page);
function run_the_page() {
  api_obj_wether(input_value).then(function (weather_data) {
    let list = weather_data.list;

    console.log(list);
    i = slider_control();
    dgree_js = weather_data.list[i].main.temp;
    dgree.innerText = Math.round(dgree_js) + "°";

    let city = weather_data.city.name;
    const day = today.toLocaleDateString();
    loction.innerText = city + " " + day + " " + cerent_time;
    wind_speed = list[i].wind.speed;
    humidity_value = list[i].main.humidity;
    humidity.innerText = humidity_value + "%";
    wind.innerHTML = wind_speed + "MPH";
    sky_description_js = list[i].weather[i].description;
    sky_description.innerText = sky_description_js;
    weather_id_js = list[i].weather[i].id;

    body_Image.style.backgroundImage = theem_changer(weather_id_js)[0];
    main_img.innerHTML = theem_changer(weather_id_js)[1];

    //  dgree.innerHTML=temp+'°'

    // wether each day
    days_array_en = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    days_array_he = [
      "יום א",
      "יום ב",
      "יום ג",
      "יום ד",
      "יום ה",
      "יום ו",
      "שבת",
    ];
    let days_adder = 0;
    let days_array_index = 0;
    let day_print;

    for (let k = 8; k <= 40; k += 8) {
      switch (true) {
        case k === 8:
          // tomaroww
          // day
          days_adder += 1;
          days_array_index = days_adder + curennt_num_day;
          days_array_index =
            days_array_index > 6 ? days_array_index % 7 : days_array_index;
          day_print =
            translate_bool === true
              ? days_array_he[days_array_index]
              : days_array_en[days_array_index];
          tomaroww.innerText = day_print;
          // theem
          weather_id = list[k].weather[0].id;
          tomaroww_img.innerHTML = theem_changer(weather_id)[1];

          //  degrees
          dgree_js = list[k].main.temp;
          tomaroww_degree.innerText = Math.round(dgree_js) + "°";
          // scale

          break;

        case k === 16:
          // thirday
          // day
          days_adder += 1;
          days_array_index = days_adder + curennt_num_day;
          days_array_index =
            days_array_index > 6 ? days_array_index % 7 : days_array_index;

          day_print =
            translate_bool === true
              ? days_array_he[days_array_index]
              : days_array_en[days_array_index];

          third_day.innerText = day_print;

          // degrees
          dgree_js = list[k].main.temp;
          third_day_degree.innerText = Math.round(dgree_js) + "°";
          // img changer
          weather_id = list[k].weather[0].id;
          third_day_img.innerHTML = theem_changer(weather_id)[1];
          break;
        case k === 24:
          // forthday
          days_adder += 1;
          days_array_index = days_adder + curennt_num_day;
          days_array_index =
            days_array_index > 6 ? days_array_index % 7 : days_array_index;
          day_print =
            translate_bool === true
              ? days_array_he[days_array_index]
              : days_array_en[days_array_index];

          forth_day.innerText = day_print;

          dgree_js = list[k].main.temp;
          forth_day_degree.innerText = Math.round(dgree_js) + "°";

          // img
          weather_id = list[k].weather[0].id;
          forth_day_img.innerHTML = theem_changer(weather_id)[1];
          break;
        case k === 32:
          // fiveday
          // day
          days_adder += 1;
          days_array_index = days_adder + curennt_num_day;
          days_array_index =
            days_array_index > 6 ? days_array_index % 7 : days_array_index;
          day_print =
            translate_bool === true
              ? days_array_he[days_array_index]
              : days_array_en[days_array_index];
          fitht_day.innerText = day_print;
          // img
          weather_id = list[k].weather[0].id;
          fitht_day_img.innerHTML = theem_changer(weather_id)[1];
          // degrees
          dgree_js = list[k].main.temp;
          fitht_day_degree.innerText = Math.round(dgree_js) + "°";
          break;
        case k === 40:
          // sixtday
          k -= 1;

          days_adder += 1;
          k += 3;

          break;

        default:
          break;
      }
    }
  });
}

inputElement.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    input_value = inputElement.value;
    run_the_page();
  }
});
const fog_theem = "https://thumbs.gfycat.com/JointNippyCrayfish.webp";
const thander_storm_theem =
  "https://media.tenor.com/Aa66xUzSzSEAAAAC/thor-avengers.gif";
const clear_Sky_theem =
  "https://i.gifer.com/origin/52/529d0928c046f2483a26dec27594b979_w200.webp";
const claowdy_theem =
  "https://media.tenor.com/gznLWsJjaMAAAAAC/daytime-miving.gif";
const rain_theem =
  "https://thumbs.gfycat.com/AdorableBrownEuropeanfiresalamander-size_restricted.gif";
const snow_theem =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/20936f7a-b9ce-46cd-948d-af8ed6302b28/d5ou6kc-6b27690a-6fff-4d30-8dda-6c2859a6200d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIwOTM2ZjdhLWI5Y2UtNDZjZC05NDhkLWFmOGVkNjMwMmIyOFwvZDVvdTZrYy02YjI3NjkwYS02ZmZmLTRkMzAtOGRkYS02YzI4NTlhNjIwMGQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.aoKg1SD-GujMqzWWQn3wnszWej_BS8CgRyRCUoans8A";
const hot_as_f_theem =
  "https://usagif.com/wp-content/uploads/2022/fzk5d/15-killing-heat-acegif.gif.webp";
const clawod_theem =
  "https://i.pinimg.com/originals/85/db/41/85db411e5bebff00b8a21f6d29d8c394.gif";
let wether_pack = {
  thander_storm: [
    `url(${thander_storm_theem})`,
    `<img src="${"thander_storm.png"}" alt="" />`,
  ],
  drizzle: [`url(${rain_theem})`, `<img src="${"very_rain.png"}" alt="" />`],
  rain: [`url(${rain_theem})`, `<img src="${"rain.png"}" alt="" />`],
  snow: [`url(${snow_theem})`, `<img src="${"snowy.png"}" alt="" />`],
  fog: [`url(${fog_theem})`, `<img src="${"fog.png"}" alt="" />`],
  clear: [
    `url(${clear_Sky_theem})`,
    `<img src="${"thery_sunny.png"}" alt="" />`,
  ],
  claowdy: [`url(${claowdy_theem})`, `<img src="${"cloudy.png"}" alt="" />`],
};
function theem_changer(id) {
  switch (true) {
    case id <= 232:
      // thander_storm
      return wether_pack.thander_storm;

    case id > 232 && id < 300:
      // drizzle
      return wether_pack.drizzle;

    case id >= 300 && id < 500:
      // rain
      return wether_pack.rain;

      break;
    case id >= 500 && id < 600:
      // rain
      return wether_pack.rain;

    case id >= 600 && id < 700:
      //   snow
      return wether_pack.snow;

    case id >= 700 && id < 800:
      return wether_pack.fog;
    // fog

    case id === 800:
      // clear
      return wether_pack.clear;

    case id > 800:
      // claody
      return wether_pack.claowdy;

    default:
      wether_pack.claowdy;
  }
}

const degrees_obj = {
  0: "style.width=10%",
  "10-20": "style.width=20%",
  "20-30": "style.width=50%",
  "40...": "style.width=90%",
};

function scale_dgrees_stylepack(degrees) {
  switch (true) {
    case degrees < 0:
      break;
    case degrees < 10 && degrees < 20:
      break;
    case degrees > 20 && degrees < 30:
      break;
    case degrees > 30 && degrees < 40:
      break;
    case degrees > 40:
      break;

    default:
      break;
  }
}
const list = tomaroww_scale.classList;
list.add("anotherClass");

console.log(list);
