/* Caroline Hobson

*/
'use strict';
/* Add all the required libraries*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');
/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
   Listing.find({name: 'Library West', code: 'LBW'}, function(err,entry){
     if(err) throw err;

     console.log(entry);
   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
   Listing.findOneAndRemove({code: 'CABL'}, function(err){
     //thows if cant find entry
     if (err) throw err;
      console.log('Deleted CABL');
   });
};


var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
   Listing.findOneAndUpdate({name: 'Phelps Laboratory'}, {address:'1953 Museum Rd, Gainesville, FL 32603, United States', coordinates: {latitude: 29.644890, longitude: -82.348834 }}, function(err, entry){
     if(err) throw err;
   });

   Listing.find({name: 'Phelps Laboratory'}, function(err,entry){
     if(err) throw err;

     console.log(entry);
   });

};

var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
   Listing.find({}, function(err, entry){
     if (err) throw err;
     //returns all entries
     console.log(entry);
   });

};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
