// on load find coordinates

window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(`.temperature-description`);
    let temperatureDegree = document.querySelector(`.temperature-degree`);
    let locationTimeZone = document.querySelector(`.location-timezone`);
    let temperatureSection = document.querySelector(`.temperature-section`);
    const temperatureSpan = document.querySelector('.temperature-section span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4e5971ce9aaab638f002a3049bf60a74/${lat},${long}`;

            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;


                    // DOM elements from api
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;

                    // temperature conversion

                    let celsius = (temperature - 32) * (5 / 9)
                    // set icons

                    setIcons(icon, document.querySelector('.icon'));

                    // temperature changer celsius/fahrenheit
                    temperatureSection.addEventListener(`click`, () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    })
                });

        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});

function timedRefresh(timeoutPeriod) {
    setTimeout("location.reload(true);", timeoutPeriod);
}