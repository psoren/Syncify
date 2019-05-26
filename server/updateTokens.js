require('dotenv').config();
let request = require('request');

//Refresh tokens
module.exports = (app) => {
  app.post('/updateTokens', async(req, res) => {
    if (req.body && req.body.refreshToken) {

      let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          grant_type: 'refresh_token',
          refresh_token: req.body.refreshToken
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer('d76ab0506f804a148cd10e9671f0aab7' + ':' + 'dd3f8b6f5f504e86b907109e938c3e25').toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function (error, response, body) {
        //console.log('res status: ' + response.statusCode);
        if (!error && response.statusCode === 200) {
          //Send data back to client
          res.json({
            success: true,
            accessToken: body.access_token,
          });
        }
        else {
          console.log('(server.js) Error when updating token');
          res.json({ success: false });
          console.log(response.body);
          console.log(error);
        }
      });
    }
  });
}
