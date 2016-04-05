var http = require('http');
var express = require('express');
var router = express.Router();
/////////////// ROUTES ///////////////////////////////////

/**
 * 200 - OK success GET
 * 201 - created success POST
 * 203 - created success PUT
 * 204 - no content success DELETE
 * 400 bad request
 * 401 unathorized
 * 403 forbidden
 * 404 not found
 * 405 method not allowed
 */

var sendJson = function(res, status, content) {
      // Add default message
      res.status(status);
      res.json(content);
};


router.post('/attendee', function(req, res){

  var data = JSON.stringify(req.body);

  var options = {
    host: 'atgdev02.decisions.com',
    path: '/aria/Primary/?FlowId=c5815f60-fad7-11e5-838c-00155d140c03&Action=api',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
  };

  var reqOut = http.request(options, function(response) {
    var str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      try {
        sendJson(res, 200, JSON.parse(str));
      } catch (e) {
        sendJson(res, 500, {error: 'Error parsing response to JSON', data: str});
      }

    });
    }
  );

  reqOut.write(data);
  reqOut.end();

});


router.get('/attendee', function(req, res){
  var options = {
    host: 'atgdev02.decisions.com',
    path: '/aria/Primary/?FlowId=99fa1f2c-faa2-11e5-838c-00155d140c03&Action=api&sessionid=NS-c772a285-b308-11e5-8b90-00155d140c03&outputtype=JSON',
  };

  var reqOut = http.request(options, function(response) {
    var str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      try {
        sendJson(res, 200, JSON.parse(str));
      } catch (e) {
        sendJson(res, 500, {error: 'Error parsing response to JSON', data: str});
      }

    });
    }
  );

  reqOut.end();

});


module.exports = router;
