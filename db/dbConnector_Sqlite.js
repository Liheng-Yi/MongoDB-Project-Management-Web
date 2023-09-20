const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':./bikeShare.sqlite');
const {open} = require("sqlite");




async function connect() {
    return open({
        filename = 
    }

    )
    db.all(`SELECT ride_id,start_station_name,end_station_name 
FROM tripdata
ORDER BY ride_id DESC
LIMIT 20;
`);


});

db.close();

