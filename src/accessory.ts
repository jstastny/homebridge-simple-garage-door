import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service
} from "homebridge";

let hap: HAP;

/*
 * Initializer function called when the plugin is loaded.
 */
export = (api: API) => {
  hap = api.hap;
  api.registerAccessory("SimpleGarageDoor", SimpleGarageDoor);
};

class SimpleGarageDoor implements AccessoryPlugin {

  private readonly log: Logging;
  private readonly name: string;

  private readonly switchService: Service;
  private readonly informationService: Service;

  constructor(log: Logging, config: AccessoryConfig, api: API) {
    this.log = log;
    this.name = config.name;

    
    this.switchService = new hap.Service.GarageDoorOpener(this.name);
    this.switchService.getCharacteristic(hap.Characteristic.CurrentDoorState)
      .on(CharacteristicEventTypes.GET, () => {
        return hap.Characteristic.CurrentDoorState.OPEN;

      })
    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, "Jan Stastny")
      .setCharacteristic(hap.Characteristic.Model, "Model 001");

    log.info("Garage door finished initializing!");
  }

  /*
   * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
   * Typical this only ever happens at the pairing process.
   */
  identify(): void {
    this.log("Identify!");
  }

  /*
   * This method is called directly after creation of this instance.
   * It should return all services which should be added to the accessory.
   */
  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }

}
