import React, { useState, useEffect } from 'react';

import SnowStationElement from "./snow_station_element";
import SnowStationTitle from "./snow_station_title";
import { getStation } from "./fmiRequests"

interface StationProps {
    stationId: string
}

const SnowStation: React.FunctionComponent<StationProps> = ({stationId}: StationProps) => {
    const [stationDetailsData, setStationDetailsData] = useState([{ time: '', date: '', snow: '', temperature: ''}]);
    const [lastStationId, setLastStationId] = useState('');
    const [oldSnow, setOldSnow] = useState(0);

    useEffect(() => { 
        if (stationId !== lastStationId) {
            setLastStationId(stationId);

            getStation(stationId).then((stationData: any) => {
                const newOldSnow = stationData[0].snow;

                if (newOldSnow != null) {
                    setOldSnow(Number.parseInt(newOldSnow))
                }
                
                setStationDetailsData(stationData);
            })
            
                
        }
    }, [stationId, lastStationId]);

    return (
        
        <div className="station">
            <SnowStationTitle stationId={stationId} oldSnow={oldSnow}/>
            <SnowStationElement stationData={stationDetailsData}></SnowStationElement>
        </div>
    )
};

export default SnowStation; 