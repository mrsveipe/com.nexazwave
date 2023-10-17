'use strict';

const { Homey } = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class NexaZMD107 extends ZwaveDevice {

  /**
   * onInit is called when the device is initialized.
   */
  async onNodeInit() {
    this.enableDebug();
    this.log('ZMD-107 has been initialized');
    this.registerCapability('alarm_motion', 'NOTIFICATION');
    this.registerCapability('measure_battery', 'BATTERY');
    
    const node = await this.homey.zwave.getNode(this);


    node.CommandClass.COMMAND_CLASS_BASIC.on("report", (command, report) => {
	this.log(command.name); // e.g. BASIC_REPORT
	this.log(report); // e.g. { Value: true }
  });
  }

}

module.exports = NexaZMD107;
