/** 
 * Module dependencies.
 */

var https = require('https');

/**
 * Requests data from specified URL.
 *
 * @param {string} url The URL to request data
 * @param {boolean} rawData Return raw data from the response if true or parsed data if false
 * @param {function(Error, Data)} callback A callback function
 * @api private 
 */

function requestData(url, rawData, callback) {
  var data = '';

  https.get(url, function(res) {
    res.on('data', function(d){
      data = data + d;
    });

    res.on('end', function() {      
      if (rawData) {
        return callback(null, data);
      } else {
        return callback(null, JSON.parse(data));
      }
    });
  }).on('error', function(err) {
    return callback(err, null);
  });     
}

module.exports = {
  /**
   * Requests warranty information from the Dell API based on the service tag.
   *
   * @param {string} serviceTag Dell service tag
   * @param {string} apiKey Dell API key
   * @param {boolean} rawData Return raw data from the response if true or parsed data if false
   * @param {function(Error, Data)} callback A callback function
   * @api public
   */

  getAssetWarranty: function(serviceTag, apiKey, rawData, callback) {
    var url = 'https://api.dell.com/support/v2/assetinfo/warranty/tags.json?svctags=' + serviceTag + '&apikey=' + apiKey;
    
    requestData(url, rawData, callback);
  }, 

  /**
   * Requests the asset headers from the Dell API based on the service tag.
   *
   * @param {string} serviceTag Dell service tag
   * @param {string} apiKey Dell API key
   * @param {boolean} rawData Return raw data from the response if true or parsed data if false
   * @param {function(Error, Data)} callback A callback function
   * @api public
   */

  getAssetHeaders: function(serviceTag, apiKey, rawData, callback) {
    var url = 'https://api.dell.com/support/v2/assetinfo/header/tags.json?svctags=' + serviceTag + '&apikey=' + apiKey;

    requestData(url, rawData, callback);
  },

  /**
   * Requests the asset details from the Dell API based on the service tag.
   *
   * @param {string} serviceTag Dell service tag
   * @param {string} apiKey Dell API key
   * @param {boolean} rawData Return raw data from the response if true or parsed data if false
   * @param {function(Error, Data)} callback A callback function
   * @api public
   */

  getAssetDetail: function(serviceTag, apiKey, rawData, callback) {
    var url = 'https://api.dell.com/support/v2/assetinfo/detail/tags.json?svctags=' + serviceTag + '&apikey=' + apiKey;

    requestData(url, rawData, callback);
  },

  /**
   * Requests code mapping from the Dell API based on the code type.
   *
   * @param {string} serviceTag Dell service tag
   * @param {string} apiKey Dell API key
   * @param {boolean} rawData Return raw data from the response if true or parsed data if false
   * @param {function(Error, Data)} callback A callback function
   * @api public
   */

  getCodeMappingByType: function(cType, apiKey, rawData, callback) {
    var url = 'https://api.dell.com/support/v2/assetinfo/codemapping/type.json?ctype=' + cType + '&apikey=' + apiKey;

    requestData(url, rawData, callback);
  }
}