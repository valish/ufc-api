
/*

  UFC Fighter API in NodeJS
  -------------------------
  Crawler and Parser for UFC.com Fighter Profiles

  Copyright: (c) 2015 Andrew Valish
  License: BSD, see LICENSE for more details

*/

var request = require("request");
var cheerio = require("cheerio");

//-------------------------------------------------------+
//  Get Fighter Profile Data
//  ufc.getFighter(url, callback(data));
//-------------------------------------------------------+

module.exports.getFighter = function(url, callback) {
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      //----------------------------------+
      //  JSON object for Fighter
      //----------------------------------+
      var fighter = {
        name: "",
        nickname: "",
        fullname: "",
        hometown: "",
        location: "",
        age: "",
        height: "",
        height_cm: "",
        weight: "",
        weight_kg: "",
        record: "",
        college: "",
        degree: "",
        summary: [],
        strikes: {
          attempted: 0,
          successful: 0,
          standing: 0,
          clinch: 0,
          ground: 0
          },
        takedowns: {
          attempted: 0,
          successful: 0,
          submissions: 0,
          passes: 0,
          sweeps: 0
        },
        fights: []
      };

      // Name
      $('#fighter-details h1').filter(function() {
        var el = $(this);
        name = el.text();
        fighter.name = name;
      });

      // Nickname
      $('td#fighter-nickname').filter(function() {
        var el = $(this);
        nickname = el.text();
        fighter.nickname = nickname;
      });

      // Fullname
      $('head title').filter(function() {
        var el = $(this);
        fullname = el.text().split(' -')[0];
        fighter.fullname = fullname;
      });

      // Hometown
      $('td#fighter-from').filter(function() {
        var el = $(this);
        hometown = el.text().replace(/[\n\t]/g,"");
        fighter.hometown = hometown;
      });

      // Location
      $('td#fighter-lives-in').filter(function() {
        var el = $(this);
        location = el.text().replace(/[\n\t]/g,"");
        fighter.location = location;
      });

      // Age
      $('td#fighter-age').filter(function() {
        var el = $(this);
        age = el.text();
        fighter.age = age;
      });

      // Height
      $('td#fighter-height').filter(function() {
        var el = $(this);
        height = el.text().split(' (')[0];
        height_cm = el.text().split('( ')[1].split(' cm )')[0];
        fighter.height = height;
        fighter.height_cm = height_cm;
      });

      // Weight
      $('td#fighter-weight').filter(function() {
        var el = $(this);
        weight = el.text().split(' lb (')[0];
        weight_kg = el.text().split('( ')[1].split(' kg )')[0];
        fighter.weight = weight;
        fighter.weight_kg = weight_kg;
      });

      // Record
      $('td#fighter-skill-record').filter(function() {
        var el = $(this);
        record = el.text();
        fighter.record = record;
      });

      // College
      $('td#fighter-college').filter(function() {
        var el = $(this);
        college = el.text();
        fighter.college = college;
      });
      
      // Degree
      $('td#fighter-degree').filter(function() {
        var el = $(this);
        degree = el.text();
        fighter.degree = degree;
      });

      // Summary
      $('td#fighter-skill-summary').filter(function() {
        var el = $(this);
        summary = el.text().split(", ");
        fighter.summary = summary;
      });

      // Striking Metrics
      $('#fight-history .overall-stats').first().filter(function() {
        var el = $(this);
        var stAttempted = el.find('.graph').first();
        var stSuccessful = el.find('.graph#types-of-successful-strikes-graph');
        strikes_attempted = parseInt(stAttempted.find('.max-number').text());
        strikes_successful = parseInt(stAttempted.find('#total-takedowns-number').text());
        strikes_standing = parseInt(stSuccessful.find('.text-bar').first().text());
        strikes_clinch = parseInt(stSuccessful.find('.text-bar').first().next().text());
        strikes_ground = parseInt(stSuccessful.find('.text-bar').first().next().next().text());
        fighter.strikes.attempted = strikes_attempted;
        fighter.strikes.successful = strikes_successful;
        fighter.strikes.standing = strikes_standing;
        fighter.strikes.clinch = strikes_clinch;
        fighter.strikes.ground = strikes_ground;
      });

      // Grappling Metrics
      $('#fight-history .overall-stats').first().next().filter(function() {
        var el = $(this);
        var tdAttempted = el.find('.graph').first();
        var tdSuccessful = el.find('.graph#grappling-totals-by-type-graph');
        takedowns_attempted = parseInt(tdAttempted.find('.max-number').text());
        takedowns_successful = parseInt(tdAttempted.find('#total-takedowns-number').text());
        takedowns_submissions = parseInt(tdSuccessful.find('.text-bar').first().text());
        takedowns_passes = parseInt(tdSuccessful.find('.text-bar').first().next().text());
        takedowns_sweeps = parseInt(tdSuccessful.find('.text-bar').first().next().next().text());
        fighter.takedowns.attempted = takedowns_attempted;
        fighter.takedowns.successful = takedowns_successful;
        fighter.takedowns.submissions = takedowns_submissions;
        fighter.takedowns.passes = takedowns_passes;
        fighter.takedowns.sweeps = takedowns_sweeps;
      });

      callback(fighter);
    }
  });
}

