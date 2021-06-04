const WEBHOOKS =
  'https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant_book-jpvzf/service/restaurants/incoming_webhook';
const USERS = {};
USERS.verifyUsers = async ({ username, password }) => {
  // testing
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (username === '1' && password === '2') {
  //       resolve();
  //     } else {
  //       reject();
  //     }
  //   }, 3000);
  // });
  const data = {
    username,
    password,
    admin: false,
  };
  const option = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  };
  fetch(`${WEBHOOKS}/users`, option)
    .then((res) => {
      console.log('User Verification completed!');
      return;
    })
    .catch((error) => {
      console.log('from fetch: ', error);
    });
};
export default USERS;
