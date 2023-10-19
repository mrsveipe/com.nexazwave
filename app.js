'use strict';

const Homey = require('homey');

class NexaZWave extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Nexa Z-Wave has been initialized');
  }

}

module.exports = NexaZWave;
