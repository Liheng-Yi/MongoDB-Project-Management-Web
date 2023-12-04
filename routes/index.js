let express = require('express');
let router = express.Router();
const fs = require('fs').promises;
const path = require('path');


const {
    getClientData, projectsListWithEmployeeNames, addClient, deleteClient, editClient,
    addProject, deleteProject, editProject
    
} = require("../db/mongoDBConnector.js");

router.get('/', async function(req, res, next) {
  const clientData = await getClientData();
  console.log(clientData)
  res.render('client', { title: 'Clients', clientData: clientData});

});

/* GET home page. */
router.get('/client', async function(req, res, next) {

  const clientData = await getClientData();
  res.render('client', { title: 'Clients', clientData: clientData});

});


router.get('/project', async function(req, res, next) {

  const clientData = await projectsListWithEmployeeNames();

  
  res.render('project', { title: 'Project', clientData: clientData});
  
});


router.post('/clients', async function(req, res) {
    const { name, email, address } = req.body;

    // Create a new client object
    const newClient = {
        client_name: name,
        email: email,
        address: address
    };

    try {
        const result = await addClient(newClient);
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/projects', async function(req, res) {

    const { name, aID, eID } = req.body;

    const newClient = {
        name: name,
        clientId: aID,
        employeeId: eID
    };
    
    try {
        const result = await addProject(newClient);
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/clients/:id', async function(req, res) {

    const clientID = req.params.id;
    try {
        const result = await deleteClient(clientID);
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }

});


router.delete('/projects/:id', async function(req, res) {
    console.log("111")
});


router.patch('/clients/:id', async function(req, res) {
    const clientID = req.params.id;
    const clientData = req.body;
    try {
        const result = await editClient(clientID, clientData);
        res.status(200).json({ message: "Client updated successfully", data: result });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});


router.patch('/projects/:id', async function(req, res) {
    const projectID = req.params.id;
    const projectData = req.body;
    console.log("!!!!!")
    console.log(projectID)
    console.log(projectData)
    try {
        const result = await editProject(projectID, projectData);
        res.status(200).json({ message: "Project updated successfully", data: result });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;
