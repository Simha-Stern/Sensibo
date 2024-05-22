import React, { useEffect, useState } from 'react';
import { getDevices } from '../services/get&set';
import { SensiboDevice } from '../types/sensibo';

const DeviceList: React.FC = () => {
    const [devices, setDevices] = useState<SensiboDevice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const devices = await getDevices();
                setDevices(devices);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch devices');
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Device List</h1>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>{device.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DeviceList;