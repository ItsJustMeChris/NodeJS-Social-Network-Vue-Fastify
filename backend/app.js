const fastify = require('fastify')({
  logger: true,
});

fastify.register(require('fastify-cors'), { origin: '*' });

fastify.get('/', async (req, res) => {
  res.type('application/json').code(200);
  return { hello: 'world' };
});

fastify.post('/login', async (req, res) => {
  res.type('application/json').code(200);
  return { status: 'success', message: 'logged in good' };
});

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
