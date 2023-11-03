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
    modifyAddress
} = require("../db/dbConnector_Sqlite.js");


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

router.post('/clients', async function(req, res) {
    const { name, email } = req.body;
    const sql = 'INSERT INTO Clients(name, email) VALUES(?, ?)';
    await addClient(sql, name, email, req, res);
    res.redirect('/client')
});

router.post('/addresses', async function(req, res) {
    const { address, cID } = req.body;
    const sql = 'INSERT INTO Addresses(address, cID) VALUES(?, ?)';
    await addAddress(sql, address, cID, req, res);
    res.redirect('/address')
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
    const sql = `UPDATE addresses SET address = ?, cID = ? WHERE addressID = ?`;
    try{
      await modifyAddress(sql, address, cID, req.params.id, req, res)
      res.status(200).send("address edited successfully");
    } catch (error) {
        console.error("Failed to edit address:", error);
        res.status(500).send("Internal Server Error");
    }
    

});


module.exports = router;
