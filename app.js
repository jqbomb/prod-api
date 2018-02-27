const Datastore = require('@google-cloud/datastore');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const projectId = 'webstore-194800';

// Creates a client
const datastore = new Datastore({
  projectId: projectId,
  keyFilename: '/Users/justin/dev-projects/prod-api/Webstore-33a1dce49904.json',
  namespace: 'prodTest'
});

const api = express();
api.use(cors());

//Get product by name
api.get('/getProdByName/:name', async (req, res) => {
  try {
      
    let name = req.params.name;
      
    const q2 = datastore
    .createQuery('Products')
     .filter('Name', name)
     .limit(5);
      
      datastore.runQuery(q2).then(results => {
        res.json(results);      
      })

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.get('/getProdBySku/:id(\\w+)', async (req, res) => {
  try {
      
    let id = req.params.id;  
      
    const q3 = datastore
    .createQuery('Products')
     .filter('Sku', id)
    .limit(5);
      
      datastore.runQuery(q3).then(results => {
        res.json(results);      
      })

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.listen(3000, () => console.log('Datastore Product API listening on port 3000!'))