import axios from 'axios';
// setting up deployed backend endpoint from mongodb
export default axios.create({
  baseURL:
    'https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant_book-jpvzf/service/restaurants/incoming_webhook', // remove 's'
  headers: {
    'Content-type': 'application/json',
  },
});
