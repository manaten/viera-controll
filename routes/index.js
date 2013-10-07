
/*
 * GET home page.
 */
var request = require('request');

var VIERA_HOST = process.argv[2];

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.sendKey = function(req, res){
  var id = req.body.id;
  console.log(id);

  var input =
    '<?xml version="1.0" encoding="utf-8"?>'+
    '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
    '<s:Body><u:X_SendKey xmlns:u="panasonic-com:service:p00NetworkControl:1">'+
    '<X_KeyEvent>NRC_' + id + '-ONOFF</X_KeyEvent>'+
    '</u:X_SendKey></s:Body></s:Envelope>';
  request.post({
    url: 'http://'+VIERA_HOST+':55000/nrc/control_0',
    headers: { 'SOAPACTION': '"urn:panasonic-com:service:p00NetworkControl:1#X_SendKey"' },
    body: input
  }, function(error, result, body) {
    res.send({ok:"ok", result:result});
    res.end();
  });
};
