var BleHeartRateReader = require('../lib/BleHeartRateReader');
var hrm = new BleHeartRateReader();

hrm.on('connection', function(peripheral) {
  console.log(peripheral.advertisement + ' connected');
});

hrm.on('data', function(data) {
  console.log(data.hr);
});