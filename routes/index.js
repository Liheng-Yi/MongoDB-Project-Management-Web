let express = require('express');
let router = express.Router();
const fs = require('fs').promises;
const path = require('path');


const {
    getTripData, getAddressData, getProjectData,
    addClient, addProject, addAddress,
    deleteClient, deleteProject, deleteAddress,
    modifyClient, modifyAddress
    
} = require("../db/dbConnector_Sqlite.js");

router.get('/', async function(req, res, next) {

  const tripdata = await getTripData();

  res.render('client', { title: 'Clients', tripdata: tripdata});

});

/* GET home page. */
router.get('/client', async function(req, res, next) {

  const tripdata = await getTripData();

  res.render('client', { title: 'Clients', tripdata: tripdata});

});

router.get('/address', async function(req, res, next) {

  const addressData = await getAddressData();
  // console.log("index.js: here is address data", addressData)
  res.render('address', { title: 'Address', tripdata: addressData});
});

router.get('/project', async function(req, res, next) {

  const projectData = await getProjectData();
  // console.log("index.js: here is address data", addressData)
  res.render('project', { title: 'Project', tripdata: projectData});
});


router.post('/clients', async function(req, res) {
    const { name, email } = req.body;
    const sql = 'INSERT INTO Clients(name, email) VALUES(?, ?)';
    await addClient(sql, name, email, req, res);
    res.redirect('/client')
});

router.post('/addresses', async function(req, res) {
    const { address, cID } = req.body;
    const sql = 'INSERT INTO Addresses(address, cID) VALUES(?, ?)';
    
    try {
        const result = await addAddress(sql, address, cID, req, res);
        if (result !== 'handled') {
            res.redirect('/address');
        }
    } catch (error) {
        console.error("An error occurred:", error);
        if (!res.headersSent) {
            // generic error 
            res.status(500).send("Server error");
        }
    }
});

router.post('/projects', async function(req, res) {
    const { name, aID } = req.body; // Extract project name and address ID from the request
    const sql = 'INSERT INTO Projects(name, aID) VALUES(?, ?)'; // SQL statement to insert into the Projects table
    console.log(req.body)
    try {
        // Assuming you have a function to add a project, similar to addAddress
        const result = await addProject(sql, name, aID, req, res);
        if (result !== 'handled') {
            res.redirect('/project'); // Redirect to the project page after successful insertion
        }
    } catch (error) {
        console.error("An error occurred:", error);
        if (!res.headersSent) {
            res.status(500).send("Server error");
        }
    }
});

router.delete('/clients/:id', async function(req, res) {
    const clientId = req.params.id;
    try {
        await deleteClient(clientId);
        // Successfully deleted the client and its addresses
        res.status(200).send("Client and associated addresses deleted successfully");
    } catch (error) {
        // Handle the error
        console.error("Failed to delete client and associated addresses:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/address/:id', async function(req, res) {
    const addressId = req.params.id;
    try {
        await deleteAddress(addressId);
        // Successfully deleted the client and its addresses
        res.status(200).send("Client and associated addresses deleted successfully");
    } catch (error) {
        // Handle the error
        console.error("Failed to delete client and associated addresses:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/projects/:id', async function(req, res) {
    const projectId = req.params.id;
    console.log(projectId)
    try {
        await deleteProject(projectId);
        // Successfully deleted the project
        res.status(200).send("Project deleted successfully");
    } catch (error) {
        // Handle the error
        console.error("Failed to delete project:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.patch('/clients/:id', async function(req, res) {
    const { name, email } = req.body;
    const clientID = req.params.id;  // Extracting the client ID from the URL
    const sql = 'UPDATE Clients SET name = ?, email = ? WHERE clientID = ?';
    try{
      await modifyClient(sql, name, email, clientID, req, res);
      res.status(200).send("Client and associated addresses deleted successfully");
    } catch (error) {
        // Handle the error
        console.error("Failed to edit client:", error);
        res.status(500).send("Internal Server Error");
    }
    
});

router.patch('/addresses/:id', async function(req, res) {
    const { address, cID } = req.body;
    const addressID = req.params.id;
    const sql = `UPDATE addresses SET address = ?, cID = ? WHERE addressID = ?`;

    try {
        const result = await modifyAddress(sql, address, cID, addressID);
        if (result === 'handled') {
            res.status(200).send("Address edited successfully");
        }
        else{
            res.redirect('/address');
        }
    } catch (error) {
        console.error("Failed to edit address:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/reset', async function(req, res) {
    // Construct the path to the .sql file
    const sqlFilePath = path.join(__dirname, '/sql/testing.sql');
    console.log("!!!")
    try {
        // Read the file's content
        const sql = await fs.readFile(sqlFilePath, 'utf8');
        console.log(sql)
        // Pass the SQL file content to the reset function
        const result = await reset(sql);

        if (result === 'handled') {
            res.status(200).send("Reset successfully");
        } else {
            res.redirect('/client');
        }
    } catch (error) {
        console.error("Failed to reset:", error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;
