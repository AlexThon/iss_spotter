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


// const fetchCoordsByIP = function(ip, callback) {
//   request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     const geoData = JSON.parse(body).data;
//     // console.log(data)
//     const latLong = {};
//     latLong["latitude"] = geoData["latitude"];
//     latLong["longitude"] = geoData["longitude"];
//     callback(null, latLong);

//   });
// };

module.exports = fetchMyIP;