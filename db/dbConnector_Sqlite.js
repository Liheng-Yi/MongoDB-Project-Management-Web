const sqlite3 = require('sqlite3').verbose();
const {open} = require("sqlite");

const db = new sqlite3.Database("./db/bikeShare.sqlite3");





async function connect() {
    return open({
        filename:  "./db/bikeShare.sqlite3",
        driver: sqlite3.Database,
    });
}

async function getTripData() {
    const db = await connect()
    const tripdata = 
        await db.all(`SELECT ride_id,start_station_name,end_station_name 
        FROM tripdata
        ORDER BY ride_id DESC
        LIMIT 4;
        `);
        console.log("db connector got the data")


    return tripdata
}



module.exports = {
    getTripData
}



