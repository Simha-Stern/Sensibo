// src/components/DeviceControl.tsx
import React, { useEffect, useState } from 'react';
import { getDeviceState, setDeviceState as updateDeviceState } from '../services/get&set';
import { AcState } from '../types/sensibo';

interface DeviceControlProps {
    deviceId: string;
}

const DeviceControl: React.FC<DeviceControlProps> = ({ deviceId }) => {
    const [deviceState, setDeviceState] = useState<AcState | null>(null);

    useEffect(() => {
        const fetchDeviceState = async () => {
            try {
                const state = await getDeviceState(deviceId);
                setDeviceState(state);
            } catch (error) {
                console.error('Error fetching device state:', error);
            }
        };

        fetchDeviceState();
    }, [deviceId]);

    const handleStateChange = async (newState: Partial<AcState>) => {
        if (!deviceState) return;

        const updatedState: AcState = { ...deviceState, ...newState };

        try {
            await updateDeviceState(deviceId, updatedState);
            setDeviceState(updatedState);
        } catch (error) {
            console.error('Error setting device state:', error);
        }
    };

    if (!deviceState) return <div>Loading...</div>;

    return (
        <div>
            <h2>Device Control for {deviceId}</h2>
            <div>
                <label>
                    Power:
                    <select
                        value={deviceState?.on.toString()}
                        onChange={(e) => handleStateChange({ on: e.target.value === 'true' })}
                    >
                        <option value="true">On</option>
                        <option value="false">Off</option>
                    </select>
                </label>
            </div>
            {/* Add more controls as needed */}
        </div>
    );
};

export default DeviceControl;
