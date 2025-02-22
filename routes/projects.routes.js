const router = require("express").Router();

const Project = require('../models/Project.model');

router.get("/", (req, res, next) => {
  
  Project
  .find()
  .then(response => res.json(response))
  .catch(err =>next(err));
});

router.get('/:project_id', (req, res) => {

const { project_id } = req.params;

  Project
  .findById(project_id)
  .then(response => res.json(response))
  .catch(err => next(err));
})

router.post('/', (req, res, next) => {
  const { title, client, description, technologies, link,  imageUrl } = req.body;

  Project
  .create({ title, client, description, technologies, link, imageUrl })
  .then(() => res.sendStatus(201))
  .catch(err => next(err));

})

router.put('/:project_id', (req, res, next) => {
  const { project_id } = req.params;
  const { title, client, description, technologies, link, imageUrl } = req.body 

  Project
  .findByIdAndUpdate(project_id, { title, client, description, technologies, link, imageUrl }, { new: true })   
  .then(response => res.json(response))
  .catch(err => next(err));
})

router.delete('/:project_id', (req, res, next) => { 
  const { project_id } = req.params;

  Project
  .findByIdAndDelete(project_id)
  .then(response => res.json(response))
  .catch(err => next(err));
})

module.exports = router;
