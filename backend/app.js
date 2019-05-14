const fastify = require('fastify')({
  logger: true,
});

fastify.register(require('fastify-cors'), { origin: '*' });

fastify.get('/', async (req, res) => {
  res.type('application/json').code(200);
  return { error: '' };
});

/*
  POST
  @username
  @password
  >token
*/
fastify.post('/api/v1/auth/login', async (req, res) => {
  res.type('application/json').code(200);
  return { status: 'success', message: 'logged in good' };
});

/*
  POST
  @username
  @password
  @email
  >token
*/
fastify.post('/api/v1/auth/register', async (req, res) => {
  res.type('application/json').code(200);
  const { username } = req.body;
  return { status: 'success', message: username };
});

/*
  GET
  @userid
  >array[]
*/
fastify.get('/api/v1/user/:userid/info', async (req, res) => {
  res.type('application/json').code(200);
  return { name: 'bob', message: 'registered' };
});

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
