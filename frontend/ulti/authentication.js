const USERS = {};
USERS.verifyUsers = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === '1' && password === '2') {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};
export default USERS;
