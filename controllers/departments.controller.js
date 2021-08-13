const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Department.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.getRandom = async (req, res) => {
    try {
      const count = await Department.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Department.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }
exports.getOne = async (req, res) => {
    try {
      const dep = await Department.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
// METODA POST BEZ MONGOOSE
// router.post('/departments', (req, res) => {
//   const { name } = req.body;
//   req.db.collection('departments').insertOne({ name: name }, err => {
//     if(err) res.status(500).json({ message: err });
//     else res.json({ message: 'OK' });
//   })
// });

//METODA Z MONGOOSE
exports.create = async (req, res) => {
    try {
      const { name } = req.body; //wyciągnięcie parametry do stałej name
      const newDepartment = new Department({ name: name }); //tworzy nowy dokument na bazie modelu department
      await newDepartment.save(); //zapis do kolekcji 
      res.json({ message: 'OK' }); // jeżeli nie otrzyma błędu zwraca 
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };
exports.changeOne = async (req, res) => {
    const { name } = req.body;
  
    try {
      const dep = await Department.findById(req.params.id);
      if(dep) {
        await Department.updateOne({ _id: req.params.id }, { $set: { name: name }});
        res.json({ message: 'OK' + dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
exports.deleteOne = async (req, res) => {

    try {
      const dep = await Department.findById(req.params.id);
      if(dep) {
        await Department.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' + dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };