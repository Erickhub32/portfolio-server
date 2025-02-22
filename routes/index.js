module.exports = app => {


  const projectsRouter = require('./projects.routes');
  app.use('/api/projects', projectsRouter);

}