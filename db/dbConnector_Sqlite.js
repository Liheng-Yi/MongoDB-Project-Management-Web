const sqlite3 = require('sqlite3').verbose();
const {open} = require("sqlite");




async function connect() {
    const db = await open({
        filename: "./db/company.sqlite3",
        driver: sqlite3.Database
    });
    // Enable foreign key enforcement for the session
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
                // Check if the client with the given cID exists
        const clientExists = await db.get("SELECT clientID FROM Clients WHERE clientID = ?", [cID]);
        if (!clientExists) {
            res.status(400).send("Error adding the address: Client with the given ID does not exist");
            return "handled";
        }
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

async function addProject(sql, name, aID, req, res) {
    try {
        const db = await connect();
        // Check if the address with the given aID exists
        const addressExists = await db.get("SELECT addressID FROM Addresses WHERE addressID = ?", [aID]);
        if (!addressExists) {
            res.status(400).send("Error adding the address: Client with the given ID does not exist");
            return "handled";
        }
        await db.run(sql, [name, aID], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Failed to add project");
                return;
            }
            res.status(200).send("Project added successfully");
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



const deleteClient = async (clientId) => {
    const db = await connect();
    
    // Start a database transaction
    try {
        sql = 'DELETE FROM Clients WHERE clientID = ?';
        await db.run(sql, [clientId]);
    } catch (err) {
        await db.run('ROLLBACK');
        res.status(500).send("Server error");
    }
    await db.close();
    
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
const deleteProject = async (projectId) => {
    const db = await connect();
    try {
        let sql = 'DELETE FROM Projects WHERE projectId = ?';
        await db.run(sql, [projectId]);
    } catch (err) {
        console.error("An error occurred:", err);
        throw err;
    } 
    await db.close();
}

const modifyAddress = async (sql, address, cID, addressID) => {
    const db = await connect();
    try {
        const clientExists = await db.get("SELECT clientID FROM Clients WHERE clientID = ?", [cID]);
        if (!clientExists) {
            return "client not found";
        }

        await db.run(sql, [address, cID, addressID]);
        db.close();
        return "handled";
    } catch (error) {
        console.error("An error occurred:", error);
        throw error; // propagate the error to be handled in the route
    }
}




module.exports = {
    getTripData, getAddressData, getProjectData,
    addClient, addProject, addAddress,
    deleteClient, deleteProject, deleteAddress,
    modifyClient, modifyAddress
}



