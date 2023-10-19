'use strict';

const { Homey } = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class NexaZMD107 extends ZwaveDevice {

  /**
   * onInit is called when the device is initialized.
   */
  async onMeshInit() {
    this.enableDebug();
    this.log('ZMD-107 has been initialized');

    this.registerCapability('measure_battery', 'BATTERY');
    this.registerCapability('alarm_motion', 'NOTIFICATION');
    this.registerCapability('alarm_tamper', 'NOTIFICATION', {
	report: 'NOTIFICATION_REPORT',
	// temp hardcoding the report parser due to missing Event 9 in events.json
	reportParser: report => {
	if (report && report['Notification Type'] === 'Home Security' && (report.hasOwnProperty('Event (Parsed)') || report.hasOwnProperty('Event'))) {
		if (report['Event (Parsed)'] === 'Tampering, Product covering removed' ||
		report['Event (Parsed)'] === 'Tampering, Invalid Code' ||
		report['Event (Parsed)'] === 'Tampering, Product Moved' ||
		report['Event'] === 9) {
		return true;
	}
	if (report['Event (Parsed)'] === 'Event inactive' && (!report.hasOwnProperty('Event Parameter') || report['Event Parameter'][0] === 3 ||report['Event Parameter'][0] === 4 ||						report['Event Parameter'][0] === 9)) {
					return false;
				}
			}
			return null;
		},
	});

  }

  async onSettings(oldSettings, newSettings, changedKeysArr) {
    await super.onSettings(oldSettings, newSettings, changedKeysArr);
    return 'Success!';
  }
}

module.exports = NexaZMD107;
