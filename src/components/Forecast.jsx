import Days from "./Days";

function Forecast({dailyWeather}){
    const {temperature_2m_max: max,
        temperature_2m_min: min,
        time:dates,
        weathercode:codes} = dailyWeather;
        
        return(
        <div className="forecast">
            <h4>Forecast</h4>
            <ul>
                {dates.map((el,i) => <Days 
                    max = {max.at(i)}
                    min = {min.at(i)}
                    date = {el}
                    code = {codes.at(i)}
                    isToday = {i === 0}
                    key={el}
                />)}
            </ul>
        </div>
    );
}

export default Forecast
