module.exports = app => {

  const projectsRouter = require('./projects.routes');
  app.use('/api/projects', projectsRouter);

  const authRouter = require('./auth.routes');
  app.use('/api/auth', authRouter);

  const contactRouter = require('./contact.routes');
  app.use('/api/contact', contactRouter);

}