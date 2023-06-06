const QueryDB = require('../config/db_config.js');

exports.createUser = async (name, email, created_at) => {
  const data = [name, email, created_at];

  return QueryDB(
    'INSERT into users (name,email,created_at) values(?,?,?) ',
    data
  );
};

exports.checkUser = email => {
  return QueryDB('SELECT * FROM users WHERE email = ?', [email]);
};

exports.updateLastAccess = last_accessed => {
  console.log(last_accessed);
  return QueryDB(
    'UPDATE users SET last_accessed = ? WHERE email = ?',
    last_accessed
  );
};
