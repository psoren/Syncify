let request = require('request');
require('dotenv').config();

module.exports = (app) => {
  app.post('/sendInitData', async (req, res, next) => {

    let code = req.body.code;
    let state = req.body.state;

    let redirect_uri = '';
    if (process.env.NODE_ENV === 'production') {
      redirect_uri = process.env.PROD_URI;
    }
    else {
      redirect_uri = process.env.DEV_URI;
    }

    if (state == null) {
      console.log('State mismatch error');
    }
    else {
      let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET
        },
        json: true
      };
      request.post(authOptions, function (error, response, body) {
        if (error) {
          console.error('(sendInitData)');
          console.error(error);
        }
        else {
          if (response.statusCode === 200) {

            let accessToken = body.access_token;
            let refreshToken = body.refresh_token;

            var options = {
              url: 'https://api.spotify.com/v1/me',
              headers: { 'Authorization': 'Bearer ' + body.access_token },
              json: true
            };

            //Send data back to client
            request.get(options, function (error, response, body) {
              res.json({
                name: body.display_name,
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
            });
          }
          else {
            console.log('(sendInitData)');
            console.log(response);
          }
        }
      });
    }
  });
}