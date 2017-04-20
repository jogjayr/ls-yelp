#! /usr/bin/env node
const program = require('commander');
const Yelp = require('node-yelp-api-v3');
const chalk = require('chalk');
const keys = require('./keys');
const CLI = require('clui'),
    clc = require('cli-color');
 
const Line = CLI.Line;
const LineBuffer = CLI.LineBuffer;
const Spinner = CLI.Spinner;
const outputBuffer = new LineBuffer({
  x: 0,
  y: 0,
  width: 'console',
  height: 'console'
});

const blankLine = new Line(outputBuffer)
  .fill()
  .store();
 
const header = new Line(outputBuffer)
  .column('Name', 40, [clc.cyan])
  .column('Rating', 20, [clc.cyan])
  .fill()
  .store();

function list(val) {
  return val.split(',');
}

program
  .version('1.0.0')
  .option('-c, --cuisine <items>', 'Comma-separated list of cuisines. Eg. vietnamese,vegan', list)
  .option('-d', 'Sort by distance')
  .option('-r', 'Reverse sort order')
  .option('-l', 'Long format')
  .option('-z, --zip [zip]', 'Zip code', /\b\d{5}\b/g)
  .parse(process.argv);
 
const yelp = new Yelp({
  consumer_key: keys.appId,
  consumer_secret: keys.appSecret
});

function hasLocation() {
  return program.zip;
}

if (program.cuisine) {
  const params = { 
    categories: program.cuisine.join(','),
    location: program.zip
  };
  if (program.d) {
    params.sort_by = 'distance'
  }
  const spinner = new Spinner('Loading');
  spinner.start();
  yelp.searchBusiness(params).then((result) => {
    const businesses = result.businesses;
    for (let i = 0; i < result.total; i++) {
      const ratingStars = Array(Math.round(businesses[i].rating)).fill('*').join('');
      line = new Line(outputBuffer)
        .column(businesses[i].name, 40)
        .column(ratingStars, 20)
        .fill()
        .store();
    }
    spinner.stop();
    outputBuffer.output();
  });
}

