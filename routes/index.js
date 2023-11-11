let express = require('express');
let router = express.Router();

const {
    getTripData,
    addClient,
    getAddressData,
    deleteClient,
    addAddress,
    modifyClient,
    deleteAddress,
    modifyAddress,
    getProjectData
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
        console.log("here is the meg: ", result)
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



module.exports = router;
