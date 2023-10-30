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
        // First, delete the addresses associated with the client
        let sql = 'DELETE FROM Addresses WHERE cID = ?';
        await db.run(sql, [clientId]);

        // Then, delete the client itself
        sql = 'DELETE FROM Clients WHERE clientID = ?';
        await db.run(sql, [clientId]);

        // Commit the transaction if everything went fine
        await db.run('COMMIT');

        // Return the number of clients deleted (should be 1 if successful)
    } catch (err) {
        // If any error occurs, roll back the changes
        await db.run('ROLLBACK');
        throw err;  // Re-throw the error so the caller can handle it
    } finally {
        // Close the database connection
        await db.close();
    }
}





module.exports = {
    getTripData,
    addClient,
    getAddressData,
    deleteClient,
    addAddress
}



