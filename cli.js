#!/usr/bin/env node

'use strict';

var inquirer = require('inquirer');
var hex2rgb = require('hex-rgb');
var closestPaint = require('./');
var colors = [];
var brands;

var questions = [{
  type: 'checkbox',
  message: 'Select paint brands',
  name: 'brands',
  choices: closestPaint.brands,
  validate: validate
}, {
  type: 'input',
  message: 'Enter the color\'s hex',
  name: 'color'
}, {
  type: 'confirm',
  message: 'Do you want to add another color (just hit enter for YES)?',
  name: 'askAgain',
  default: true
}];

function validate(answer) {
  return answer.length < 1 ? 'You must choose at least one brand.' : true;
}

function getPaints(answers) {
  brands = brands || answers.brands;
  colors.push(answers.color);

  if (answers.askAgain) {
    ask(questions.slice(1, questions.length));
    return;
  }

  return closestPaint.getPaints({ brands: brands, colors: colors })
    .then(printPaints);
}

function printPaints(paintList) {
  paintList.forEach(function(paint) {
    console.log(paint.match + ': ' + paint.brand + ' - ' + paint.name);
  });
}

function ask(_questions) {
  inquirer.prompt(_questions).then(getPaints);
}

// start the party!
ask(questions);
