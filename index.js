#! /usr/bin/env node
const program = require('commander');
const Yelp = require('node-yelp-api-v3');
const keys = require('./keys');


function list(val) {
  return val.split(',');
}

program
  .version('1.0.0')
  .option('-c, --cuisine <items>', 'Comma-separated list of cuisines. Eg. vietnamese,vegan', list)
  .parse(process.argv);
 
const yelp = new Yelp({
  consumer_key: keys.appId,
  consumer_secret: keys.appSecret
});
if (program.cuisine) {
  const params = { 
    categories: program.cuisine.join(','),
    location: '94040' 
  };
  yelp.searchBusiness(params).then((result) => console.log(result));
}
