const WEBHOOKS =
  'https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant_book-jpvzf/service/restaurants/incoming_webhook';
const USERS = {};
USERS.verifyUsers = async ({ username, password }) => {
  const data = {
    username,
    password,
    // admin: false,
  };
  const option = {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  };
  let response;

  // try {
  //   response = await fetch(`${WEBHOOKS}/verify-user`, option);
  //   response = JSON.stringify(response);
  // } catch (err) {
  //   console.log('from fetch: ', err);
  // }
  fetch(`${WEBHOOKS}/verify-user`, option).then(
    (res) => {
      console.log('res: ', JSON.stringify(res));
    },
    (err) => {
      console.log('err: ', err);
    }
  );
  return response;
};

USERS.addUsers = async () => {
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
};
export default USERS;
