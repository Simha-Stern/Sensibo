import { AcState, SensiboDevice } from "../types/sensibo";
import { sensiboApi } from "./axios";

export const getDevices = async (): Promise<SensiboDevice[]> => {
  try {
    const response = await sensiboApi.get("/users/me/pods");
    console.log(response.data);

    return response.data.result;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

export const getDeviceState = async (deviceId: string): Promise<AcState> => {
  try {
    const response = await sensiboApi.get(`/pods/${deviceId}/acStates`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching device state:", error);
    throw error;
  }
};

export const setDeviceState = async (
  deviceId: string,
  state: AcState
): Promise<AcState> => {
  try {
    const response = await sensiboApi.post(`/pods/${deviceId}/acStates`, state);
    return response.data.result;
  } catch (error) {
    console.error("Error setting device state:", error);
    throw error;
  }
};
