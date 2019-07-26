var exports = (module.exports = {});
var db = require("../models");
var yelpAPI = require('yelp-api');
var apiKey = '81fLxhTR0I7D6azLHNAUlu88BxvFgonIl8rD-oguXUftxtdkI5DjI0AB8SEQ1w2uG3N5WobKaHuyY-Hng_jhLPFHYeuptXgzycy2gEbJxg-V_TU8wJ4A35ASpsWVW3Yx';

exports.signup = function(req, res) {
  res.render("signup");
};
exports.error = function(req, res) {
  res.render("404");
};
exports.login = function(req, res) {
  res.render("login");
};
exports.searchresults = function(req, res) {
  //we are able to call req.params.location here because this function is tied to "/searchresults/:location" (see auth.js)
  var location = req.params.location;

  // using the location value that comes from windows.location, we can search for businesses with the Yelp API
  var yelp = new yelpAPI(apiKey);
  var params = [{ location: location }];

  // yelp API called
  yelp.query('businesses/search', params)
  .then(data => {

    // data that comes from the API is a string, need to convert it to JSON 
    var dataArray = JSON.parse(data).businesses;
    
    // we are setting var yelpData like this... because this is the structure that handlebars requires 
    var yelpData = { 
      businesses: []
    }

    // keeping in mind that dataArray is the data that the Yelp API gives to us, we iterate over dataArray (like a for loop) 
    // and we push the data into the businesses:[] array (from yelpData) 
    dataArray.forEach(data => {
      var dataObject = {
        name: data.name,
        rating: data.rating,
        phone: data.phone,
        image: data.image_url,
        id: data.id
      }
      yelpData.businesses.push(dataObject);
    })

    // with our "new and improved" yelpData we give it to handlebars to be rendered
    res.render("searchresults", yelpData);

  })
  .catch(err => {

    console.log(err);
  });
};

exports.searchresults1 = function(req, res) {
  //we are able to call req.params.location here because this function is tied to "/searchresults/:location" (see auth.js)
  var location = req.params.location;

  // using the location value that comes from windows.location, we can search for businesses with the Yelp API
  var yelp = new yelpAPI(apiKey);
  var params = [{ location: location }];

  // yelp API called
  yelp.query('businesses/search', params)
  .then(data => {

    // data that comes from the API is a string, need to convert it to JSON 
    var dataArray = JSON.parse(data).businesses;
    
    // we are setting var yelpData like this... because this is the structure that handlebars requires 
    var yelpData = { 
      businesses: []
    }

    // keeping in mind that dataArray is the data that the Yelp API gives to us, we iterate over dataArray (like a for loop) 
    // and we push the data into the businesses:[] array (from yelpData) 
    dataArray.forEach(data => {
      var dataObject = {
        name: data.name,
        rating: data.rating,
        phone: data.phone,
        image: data.image_url,
        id: data.id
      }
      yelpData.businesses.push(dataObject);
    })

    // with our "new and improved" yelpData we give it to handlebars to be rendered
    res.render("searchresults1", yelpData);

  })
  .catch(err => {

    console.log(err);
  });
};


exports.profile = function(req, res) {
  // looks at Userfavorite table (in SQL) and queries the 'UserinfoId Column' 
  // it checks for any rows that have User ID of the user currently logged in
  // we have access to "req.user.id" because it is given to us from Passport.js
  db.Userfavorite.findAll({
    where: {
      UserinfoId: req.user.id
    }
  }).then(function(data) {

    // we are setting var favorites like this... because this is the structure that handlebars requires 
    var favorites = { 
      businesses: []
    }

    // keeping in mind that "data" comes from SQL, we iterate over "data" (like a for loop) 
    // and we push the data into the businesses:[] array (from favorites) 

    data.forEach(business => {
      favorites.businesses.push(business.dataValues);
    })

    // with our "new and improved" "data" we give it to handlebars to be rendered
    res.render("profile", favorites);

  });

  
};


exports.aboutus = function(req, res) {
  res.render("aboutus");
};

// sends userdata to main.handlebars, because we will need it to see who is logged
exports.favorites = function(req, res) {
  res.json(req.user);
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
exports.frontpage = function(req, res) {
  console.log("HELLLOOOOOO>>>>>>>>>", req.user);
  console.log(req.isAuthenticated());
  res.render("frontpage");
};
exports.front = function(req, res) {
  res.redirect("/frontpage");
};
