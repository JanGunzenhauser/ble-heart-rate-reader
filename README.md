ble-heart-rate-reader
=
**Simple helper for reading heart rate and rr interval data received from a bluetooth low energy heart rate monitoring device.**

This was developed on Mac OS High Sierra and tested with a [Polar H7](https://support.polar.com/en/support/H7_heart_rate_sensor) device. Other devices using the same standards for Heart Rate Characteristics might also work.  

-------

### **Example**: 
```
// import + create instance
var BleHeartRateReader = require('../lib');
var hrm = new BleHeartRateReader();

// listen for connection
hrm.on('connection', function(peripheral) {
  console.log('device connected');
});

// listen for heart rate data
hrm.on('data', function(data) {
  console.log(data.hr); // heart rate
  console.log(data.rrs); // array of rr intervals in seconds
});
```

----------

#### **Notes**
This module makes use of the [noble](https://github.com/sandeepmistry/noble) library to access bluetooth characteristics. More specifically, a [specific version](https://github.com/PolideaInternal/noble/tree/4a18e3e640f5489df76a607a6e316988ade242c5) of it was used to support Mac OS High Sierra. If you implement this modue on other systems, you can probably use the official master branch.   

-------
Brought to you by http://jg7.co