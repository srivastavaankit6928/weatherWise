function getWeatherIcon(wmoCode) {
    const icons = new Map([
        [[0], "☀️"],
        [[1], "🌤"],
        [[2], "⛅️"],
        [[3], "☁️"],
        [[45, 48], "🌫"],
        [[51, 56, 61, 66, 80], "🌦"],
        [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
        [[71, 73, 75, 77, 85, 86], "🌨"],
        [[95], "🌩"],
        [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
}

function Weather({currWeather}){
    const {temp,rain,wind,high,low,sunrise,sunset,code} = currWeather;
    
    return(
        <div className="weather">
            <div className="left">
                <h1>{getWeatherIcon(code)}</h1>
                <div className="left_details">
                    <p>{Math.floor(temp)}<span>&deg;</span>c</p>
                </div>
            </div>

            <div className="right">
                <div className="right_details">
                    <p>{`${high}°c`}</p>
                    <p>High</p>
                </div>
                <div className="right_details">
                    <p>{`${wind} km/h`}</p>
                    <p>Wind</p>
                </div>
                <div className="right_details">
                    <p>{`${sunrise.split('T')[1].substring(0,5)}`}</p>
                    <p>Sunrise</p>
                </div>
                <div className="right_details">
                    <p>{`${low}°c`}</p>
                    <p>Low</p>
                </div>
                <div className="right_details">
                    <p>{`${rain} ${rain !== 0 ?'mm': ''}`}</p>
                    <p>Rain</p>
                </div>
                <div className="right_details">
                    <p>{`${sunset.split('T')[1].substring(0,5)}`}</p>
                    <p>Sunset</p>
                </div>
            </div>
        </div>
    );
}

export default Weather
