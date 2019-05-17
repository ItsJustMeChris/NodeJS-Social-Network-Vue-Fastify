const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fastify = require('fastify')({
  logger: true,
});

const sequelize = new Sequelize('postgres://dev:dev@localhost:5432/social');

class User extends Sequelize.Model { }
User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: { type: Sequelize.STRING, unique: true },
  email: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
}, { sequelize, modelName: 'user' });

class SessionToken extends Sequelize.Model { }
SessionToken.init({
  token: { type: Sequelize.STRING, unique: true },
}, { sequelize, modelName: 'token' });

User.hasMany(SessionToken, { as: 'token' });
SessionToken.belongsTo(User);

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
async function generateToken() {
  const buffer = await new Promise((resolve, reject) => {
    crypto.randomBytes(256, (ex, buf) => {
      if (ex) {
        reject(ex);
      }
      resolve(buf);
    });
  });
  const token = crypto
    .createHash('sha1')
    .update(buffer)
    .digest('hex');
  return token;
}

fastify.post('/api/v1/auth/login', async (req, res) => {
  res.type('application/json').code(200);
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      let transaction;
      try {
        transaction = await sequelize.transaction();
        await SessionToken.sync();
        const token = await generateToken();
        const userSession = await SessionToken.create({
          token,
        }, { transaction });
        await transaction.commit();
        user.addToken(userSession);
        return { status: 'success', message: 'Logged In', token };
      } catch (error) {
        fastify.log.error(error);
        await transaction.rollback();
        return { status: 'error', message: 'An Error Happens' };
      }
    }
    return { status: 'error', message: 'Invalid Password' };
  }
  return { status: 'error', message: 'An Error Happens' };
});

fastify.post('/api/v1/auth/sessions', async (req, res) => {
  res.type('application/json').code(200);
  const { token } = req.body;
  const session = await SessionToken.findOne({
    where: { token },
  });
  if (session) {
    const allTokens = await SessionToken.findAll({ where: { userId: session.userId } });

    return allTokens.map(e => ({ token: e.token, created: e.createdAt }));
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
    const user = await User.create({
      username, password: hash, email,
    }, { transaction });
    try {
      await SessionToken.sync();
      const token = await generateToken();
      const userSession = await SessionToken.create({
        token,
      }, { transaction });
      await transaction.commit();
      user.addToken(userSession);
      return { status: 'success', message: 'User Created', token };
    } catch (error) {
      fastify.log.error(error);
      await transaction.rollback();
      return { status: 'error', message: 'An Error Happens' };
    }
  } catch (err) {
    if (err) {
      fastify.log.error(err);
      await transaction.rollback();
      return { status: 'error', message: 'An Error Happens' };
    }
  }
  return { status: 'error', message: 'An Error Happens' };
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
