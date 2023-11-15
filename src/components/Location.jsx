function Location({city}){
    
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const day= new Intl.DateTimeFormat("en", {
        weekday: "long",
        day:"numeric",
        month:"long"
        }).format(new Date(formattedDate));

    return(
        <div className="location">
            <h2>{`${city.name}, ${city.country}`}</h2>
            <p>{day}</p>
        </div>
    );
}

export default Location
