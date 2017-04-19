const Yelp = require('node-yelp-api-v3');
const keys = require('./keys');
const yelp = new Yelp({
  consumer_key: keys.appId,
  consumer_secret: keys.appSecret
});
yelp.getBusinessById('yelp-san-francisco').then((result) => console.log(result));
