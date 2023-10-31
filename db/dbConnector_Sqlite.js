const sqlite3 = require('sqlite3').verbose();
const {open} = require("sqlite");




async function connect() {
    return open({
        filename:  "./db/company.sqlite3",
        driver: sqlite3.Database,
    });
}

async function getTripData() {
    const db = await connect()
    const tripdata = 
        await db.all("SELECT * FROM Clients");
        
        // await db.all(`SELECT clientID,name,email 
        // FROM Clients
        // ORDER BY clientID DESC;
        // `);
        console.log("db connector got the data", tripdata )
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
        console.log("db connector got the data", tripdata )
    return tripdata
}


async function addClient(sql, name, email, req, res) {
    try {
        const db = await connect();
        await db.run(sql, [name, email], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Failed to add client");
                return;
            }
            else res.status(200).send("Client added successfully");
        });
        db.close();
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Server error");
    }
}
async function modifyClient(sql, name, email, clientID, req, res) {
    try {
        const db = await connect();
        await db.run(sql, [name, email, clientID], (err) => {  // Note the order of parameters
            if (err) {
                console.error(err.message);
                res.status(500).send("Failed to modify client");
                return;
            }
            res.status(200).send("Client modified successfully");
        });
        db.close();
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Server error");
    }
}

async function addAddress(sql, address, cID, req, res) {
    try {
        const db = await connect();
        await db.run(sql, [address, cID], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Failed to add address");
                return;
            }
            res.status(200).send("Address added successfully");
        });
        db.close();
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Server error");
    }
}

const deleteClient = async (clientId) => {
    const db = await connect();
    
    // Start a database transaction
    await db.run('BEGIN TRANSACTION');
    try {
        let sql = 'DELETE FROM Addresses WHERE cID = ?';
        await db.run(sql, [clientId]);
        sql = 'DELETE FROM Clients WHERE clientID = ?';
        await db.run(sql, [clientId]);
        await db.run('COMMIT');
    } catch (err) {
        await db.run('ROLLBACK');
        throw err;  
    } finally {
        await db.close();
    }
}

const deleteAddress = async (addressId) => {
    const db = await connect();
     try {
        let sql = 'DELETE FROM Addresses WHERE addressID = ?';
        await db.run(sql, [addressId]);
    } catch (err) {
        console.error("An error occurred:", error);
        res.status(500).send("Server error");
    } 
    await db.close();
}

const modifyAddress = async(sql, address, cID, addressID, req, res) =>{
    const db = await connect();
    try {
        
        await db.run(sql, [address, cID, addressID], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Failed to modify address");
                return;
            }
            res.status(200).send("Address modified successfully");
        });
        db.close();
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Server error");
    }
}



module.exports = {
    getTripData,
    addClient,
    getAddressData,
    deleteClient,
    addAddress,
    modifyClient,
    deleteAddress,
    modifyAddress
}



