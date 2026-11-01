'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

// Z-Wave Notification events that mean an active alarm. Matching on the
// event number as well as the parsed name, so the alarms still work if
// Homey's event table doesn't name an event (same issue as ZMD-107 tamper).
const SMOKE_ALARM_EVENTS = [1, 2, 3]; // smoke detected, unknown location, test
const HEAT_ALARM_EVENTS = [1, 2, 3, 4, 7]; // overheat, rapid rise, test

function notificationParser(notificationType, alarmEvents) {
  return (report) => {
    if (!report || report['Notification Type'] !== notificationType) return null;

    const event = report['Event'];
    if (alarmEvents.includes(event)) return true;

    // Event 0 ("Event inactive") clears the alarm. Its parameter, when
    // present, names the event that went idle.
    if (event === 0 || report['Event (Parsed)'] === 'Event inactive') {
      const param = report['Event Parameter'];
      const idled = param && param.length ? param[0] : undefined;
      if (idled === undefined || alarmEvents.includes(idled)) return false;
    }

    // Maintenance, dust and end-of-life events don't change the alarm.
    return null;
  };
}

class NexaZSD109 extends ZwaveDevice {

  async onNodeInit() {
    this.log('ZSD-109 has been initialized');

    this.registerCapability('alarm_smoke', 'NOTIFICATION', {
      report: 'NOTIFICATION_REPORT',
      reportParser: notificationParser('Smoke', SMOKE_ALARM_EVENTS),
    });

    this.registerCapability('alarm_heat', 'NOTIFICATION', {
      report: 'NOTIFICATION_REPORT',
      reportParser: notificationParser('Heat', HEAT_ALARM_EVENTS),
    });

    // The BATTERY handler also sets alarm_battery on a low-battery warning.
    this.registerCapability('measure_battery', 'BATTERY');
  }

}

module.exports = NexaZSD109;
