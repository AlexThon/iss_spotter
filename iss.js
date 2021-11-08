const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json',(error,response,body)=>{
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode === 200) {
      const data = JSON.parse(body);
      const myIP = data.ip;
      callback(null, myIP);
      return;
    }
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    
  });
  // use request to fetch IP address from JSON API
};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // assume error for statusCode above 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const geoData = JSON.parse(body);
    
    const {latitude, longitude} = geoData;
    callback(null, {latitude, longitude});

  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


// module.exports = {fetchMyIP,fetchCoordsByIP, fetchISSFlyOverTimes};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };