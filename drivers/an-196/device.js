// const Homey = require("homey");
// const DeviceApi = require("device-api");
const { ZwaveDevice } = require('homey-zwavedriver');

class NexaAN196Device extends ZwaveDevice {
    // this method is called when the Device is initiated
    async onNodeInit() {
        this.log("Device init");
        this.log("Name:", this.getName());
        this.log("Class:", this.getClass());
        this.registerCapability('onoff', 'SWITCH_BINARY');
    }

    // this method is called when the Device has requested a state change (turned on or off)
    async onCapabilityOnoff(value, opts) {
        this.log("Switching device to:", value);
        // ... set value to real device, e.g.
        // await setMyDeviceState({ on: value });
        // or, throw an error
        // throw new Error('Switching the device failed!');
    }
}

module.exports = NexaAN196Device;