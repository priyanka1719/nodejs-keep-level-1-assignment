const User = require('./user.entity');

const login = (info) => {
  //console.log('user data for Login: ', info);

  return new Promise((resolve, reject) => {
    const query = {
      username : info.username
    };

    User.findOne(query, (error, doc) => {

      if (error) {
        reject({
          message: 'Login Failed.',
          status: 500
        });
      } else if(!doc) {
        reject({
          message: 'You are not registered user',
          status: 403
        });
      } else if(doc.password !== info.password) {
        reject({
          message: 'Password is incorrect',
          status: 403
        });
      } else {
        resolve({
          message: 'Login Success.',
          status: 200,
          userInfo: doc
        });
      }
    });
  });
};

const register = (info) => {
  
  return new Promise((resolve, reject) => {
    let user = new User(info);

    //console.log('user data for Register: ', user);
    user.save((error, doc) => {
      if (error) {
        //console.log('Error occured in DAO', error);

        if(error.message.includes('duplicate')) {
          reject({
            message: 'username is already exist',
            status: 403
          });
        } else {
          reject({
            message: 'Registration Failed.',
            status: 500
          });
        }

      } else {
        //console.log('Success occured in DAO');
        resolve({
          message: 'Registration Success.',
          status: 201,
          userInfo: doc
        });
      }
    });
  });
};

module.exports = {
  login,
  register
};