let express = require('express');
let router = express.Router();

const { getTripData} = require("../db/dbConnector_Sqlite.js")
const { addClient} = require("../db/dbConnector_Sqlite.js")
const { getAddressData} = require("../db/dbConnector_Sqlite.js")
const { deleteClient} = require("../db/dbConnector_Sqlite.js")
const { addAddress} = require("../db/dbConnector_Sqlite.js")

/* GET home page. */
router.get('/client', async function(req, res, next) {

  const tripdata = await getTripData();

  res.render('client', { title: 'Clients', tripdata: tripdata});

});

router.get('/address', async function(req, res, next) {

  const addressData = await getAddressData();
  // console.log("index.js: here is address data", addressData)
  res.render('address', { title: 'Address!', tripdata: addressData});

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




module.exports = router;



// router.post('/clients', (req, res) => {
//   // Extract data from the request body
//   const { name, email } = req.body;
//   console.log("Got the name and email")
//   // Insert the data into the database
//   const sql = 'INSERT INTO clients(name, email) VALUES(?, ?)';


//   db.run(sql, [name, email], function(err) {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send("Failed to add client");
//       return;
//     }

//     // Return a success response
//     res.status(200).send("Client added successfully");
//   });
// });
// const sql = 'INSERT INTO clients(name, email) VALUES(?, ?)';