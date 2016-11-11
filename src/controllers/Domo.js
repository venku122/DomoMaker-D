const models = require('../models');

const Domo = models.Domo;

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    console.log("sending Domo Docs" + docs);
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const deleteDomos = (req, res) => {
  console.log('command to delete received');
  Domo.DomoModel.deleteByOwner(req.session.account._id, (err, docs) => {
    if(err) {
      console.log(err);
      return res.status(400).json({error: 'An Error occurred'});
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
    console.log("page re-rendered");
    //return res.json({ redirect: '/maker' });
  });
};


const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.description) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    description: req.body.description,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  return newDomo.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.delete = deleteDomos;
