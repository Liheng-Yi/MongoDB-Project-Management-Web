const sqlite3 = require('sqlite3').verbose();
const {open} = require("sqlite");


async function  () {
    const db = await open({
        filename: "./db/company.sqlite3",
        driver: sqlite3.Database
    });
    await db.exec('PRAGMA foreign_keys = ON');
    return db;
}

async function getTripData() {
    const db = await connect()
    const tripdata = 
        await db.all("SELECT * FROM Clients");
        
        // await db.all(`SELECT clientID,name,email 
        // FROM Clients
        // ORDER BY clientID DESC;
        // `);

    return tripdata
}

async function getAddressData() {
    const db = await connect()
    const tripdata = 
        await db.all("SELECT * FROM Addresses");
        // await db.all(`SELECT clientID,name,email 
        // FROM Clients
        // ORDER BY clientID DESC;
        // `);
        
    return tripdata
}

async function getProjectData() {
    const db = await connect()
    const tripdata = 
        await db.all("SELECT * FROM Projects");
        
        
    return tripdata
}






module.exports = {
    getTripData, getAddressData, getProjectData
}



