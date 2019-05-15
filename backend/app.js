const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const fastify = require('fastify')({
  logger: true,
});

const sequelize = new Sequelize('postgres://socialdev:pass@localhost:5432/social');

class User extends Sequelize.Model { }
User.init({
  username: { type: Sequelize.STRING, unique: true },
  email: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
}, { sequelize, modelName: 'user' });

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
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      return { status: 'success', message: 'Logged In' };
    }
    return { status: 'error', message: 'Invalid Password' };
  }
  return { status: 'error', message: 'An Error Happens' };
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
  const { username, password, email } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);


  let transaction;
  try {
    // get transaction
    transaction = await sequelize.transaction();
    await User.sync();
    await User.create({
      username, password: hash, email,
    }, { transaction });
    await transaction.commit();
  } catch (err) {
    if (err) {
      fastify.log.error(err);
      await transaction.rollback();
      return { status: 'error', message: 'An Error Happens' };
    }
  }
  return { status: 'success', message: 'User Created' };
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
