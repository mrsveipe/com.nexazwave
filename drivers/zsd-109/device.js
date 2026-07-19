'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class NexaZSD109 extends ZwaveDevice {

  /**
   * onNodeInit is called when the device (Z-Wave node) is initialized.
   * The ZSD-109 is a sleeping, battery-powered Z-Wave Plus smoke alarm.
   * It reports over the NOTIFICATION command class (v8):
   *   - Smoke Alarm (type 0x01): smoke detected / test
   *   - Heat Alarm  (type 0x04): overheat detected / test
   * and exposes battery level/low-battery over the BATTERY command class.
   */
  async onNodeInit({ node }) {
    this.enableDebug();

    // Battery level (%) and low-battery alarm.
    this.registerCapability('measure_battery', 'BATTERY');
    this.registerCapability('alarm_battery', 'BATTERY');

    // Smoke and heat alarms are delivered via the NOTIFICATION command class.
    // The homey-zwavedriver system parsers map the standard Smoke/Heat
    // notification types and events to these boolean capabilities.
    this.registerCapability('alarm_smoke', 'NOTIFICATION');
    this.registerCapability('alarm_heat', 'NOTIFICATION');

    this.log('ZSD-109 has been initialized');
  }

}

module.exports = NexaZSD109;
