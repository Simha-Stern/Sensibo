export interface AcState {
  on: boolean;
  mode: string;
  fanLevel: string;
  temperatureUnit: string;
  targetTemperature: number;
}

export interface SensiboDevice {
  id: string;
  name: string;

  // Add any other relevant properties here
}
