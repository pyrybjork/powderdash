import React, { useState, useEffect } from 'react';
import {fmisidFull} from '../data/fmisid'
import { getStationLatest } from "./fmiRequests"

interface StationProps {
    stationId: string,
    oldSnow: number
}

const SnowStationTitle: React.FunctionComponent<StationProps> = ({stationId, oldSnow}: StationProps) => {
    const [snow, setSnow] = useState('NaN');
    const [temp, setTemp] = useState('NaN');
    const [lastStationId, setLastStationId] = useState('');

    useEffect(() => {

        if (stationId !== lastStationId) {
            setLastStationId(stationId);
            getStationLatest(stationId).then((stationData: any) => {
                setSnow(stationData[0].snow);
                setTemp(stationData[0].temperature);
            })
            
        }
    }, [stationId, lastStationId]);

    return (
        <h3 className='stationTitle'>{fmisidFull.find(station => station.fmisid === stationId)?.name} {snow === 'NaN'? '[ei\u00A0saatavilla]' : `${snow}cm${'\u00A0|\u00A0'}${Number.parseInt(snow) - oldSnow >= 0? '+': ''}${Number.parseInt(snow) - oldSnow}cm`}{'\u00A0|\u00A0'}{temp}°C</h3>
    )
};

export default SnowStationTitle; 