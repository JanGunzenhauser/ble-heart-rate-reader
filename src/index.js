import EventEmitter from 'events'
import noble from 'noble'

export default class BleHeartRateReader extends EventEmitter {
  constructor() {
    super();
    noble.on('stateChange', state => {
      state === 'poweredOn' ? noble.startScanning(['180d'], false) : noble.stopScanning()
    }) 
    noble.on('discover', peripheral => {
      noble.stopScanning()
      peripheral.on('connect', err => {
        if (err) console.error(err)
        this.emit('connection', peripheral)
        peripheral.discoverSomeServicesAndCharacteristics(['180d'], ['2a37'], (err, services, characteristics) => {
          if (err) console.error(err)
          characteristics[0].on('read', (data, isNotification) => {
            if (data && data.length > 2) {
              let hrm = {
                hr: data.readUInt8(1),
                rrs: []
              }
              const rr1 = data.readUInt16LE(2, true) / 1024
              const rr2 = data.readUInt16LE(4, true) / 1024
              rr1 > 0 && hrm.rrs.push(rr1) 
              rr2 > 0 && hrm.rrs.push(rr2) 
              this.emit('data', hrm)
            }        
          })
          characteristics[0].notify(true, (err) => { if (err) console.error(err) })
        })
      })
      peripheral.connect()
    })
  }
}
