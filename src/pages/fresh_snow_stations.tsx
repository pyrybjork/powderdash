import React, { useState, useReducer } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosSnow } from 'react-icons/io';
import { MdClear, MdSearch, MdRefresh, MdInfoOutline } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import "./fresh_snow_stations.css";
import { fmisidSnow, fmisidFull } from '../data/fmisid'

import SnowStation from "../components/snow_station";

const FreshSnowStations: React.FunctionComponent = () => {
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState('');
  const [customMessage, setCustomMessage] = useState('Lisää valitsemasi havaintoasema.');
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [searchAll, setSearchAll] = useState(false);
  
  const stations  = localStorage.getItem( 'stations' ) || ['101885', '107081', '101950', '101914', '101990', '101987', 'custom'].join(',');
  
  const [id_list, set_id_list] = useState(stations.split(','));

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function updateCookie() {
    localStorage.setItem( 'stations', id_list.join(','))
  }

  function toggleInfo() {
    setInfoExpanded(!infoExpanded);
  }

  function resetStations() {
    localStorage.removeItem('stations');
    set_id_list(['101885', '107081', '101950', '101914', '101990', '101987', 'custom']);
    setSelected(6);
    forceUpdate();
  }

  function next() {
    var new_selected = selected + 1;
    if (new_selected < id_list.length) {
      setSelected(new_selected);
    } else {
      setSelected(0);
    }
  }

  function previous() {
    var new_selected = selected - 1;
    if (new_selected < 0) {
      setSelected(id_list.length - 1);
    } else {
      setSelected(new_selected);
    }
  }

  function removeCurrent() {
    if (selected < id_list.length - 1) {
      let modified_id_list = id_list;
      modified_id_list.splice(selected, 1);
      set_id_list(modified_id_list);
      forceUpdate();
      updateCookie();
    }
  }

  function handleQueryChange(event: any) {
    setQuery(event.target.value);
  }

  function handleSubmit(event: any) {
    let stationId = fmisidFull.find(station => station.name === query)?.fmisid;

    if (stationId !== undefined) {
      let modified_id_list = id_list;
      modified_id_list.splice(id_list.length - 1, 0, stationId);
      set_id_list(modified_id_list);
      forceUpdate();
      updateCookie();
    } else {
      let oldMessage = customMessage;
      setCustomMessage(`"${query}" ei ole hyväksytty havaintoasema`)
      setTimeout(() => {
        setCustomMessage(oldMessage)
      }, 2000);
    }
    event.preventDefault();
  }

  function datalistMap(item: any, index: any) {
    return <option key={index} value={item.name} label={`${fmisidSnow.some(station => station.fmisid === item.fmisid)? '❄' : ''} ${item.name}`}/>
  }

  return (
    <div className="freshSnowStations">

      <div className={'stationCard'}>
        {id_list[selected] !== 'custom' ? 
          <SnowStation stationId={id_list[selected]}></SnowStation> :

          <div className="customStation">
            <form className='customSearch' onSubmit={handleSubmit}>

              <input className='searchBar' type="text" list="data" value={query} onChange={handleQueryChange}/>

              <datalist id="data">
                {searchAll === true? fmisidFull.map(datalistMap) : fmisidSnow.map(datalistMap)}
              </datalist>
            
              <button className='searchClear searchControl' onClick={() => { setQuery('') }}> <MdClear /> </button>

              <button type="button" className={`searchToggle searchControl ${searchAll? 'searchToggleOff' : 'searchToggleOn'}`} onClick={() => { setSearchAll(!searchAll)}}> <IoIosSnow /> </button>
              
              <div className='customMessage'>
                {customMessage}{' '}
                <button onClick={resetStations} type="button" className='clearCookie'> <MdRefresh />nollaa muutokset</button>
              </div>



              <div>
                <button type="submit" className='searchSubmit'> <AiOutlinePlusCircle></AiOutlinePlusCircle> </button>
              </div>

              

            </form>
          </div>

        }
          <div className='topButton infoButton' onClick={toggleInfo}> <MdInfoOutline /> </div>
        {
          id_list[selected]  !== 'custom'? 
          <div className='topButton removeButton' onClick={removeCurrent}> <MdClear /> </div>:
          ''
        }
        <div className='stationButton right' onClick={next}><IoIosArrowForward /></div>
        <div className='stationButton left' onClick={previous}><IoIosArrowBack /></div>
        <div className='stationIndicators'>
          {id_list.map((_item, index) => (
            <div key={index} className={`stationIndicator ${index === selected? 'bigCircle' : 'smallCircle'}`}>{index === id_list.length -1? <MdSearch /> : '' }</div>
          ))}
        </div>
      </div>

      {
        infoExpanded?
        <div className='stationCard infoCard'>
          <p>Tässä voit katsella lumi- ja lämpötilahavaintoja Ilmatieteenlaitoksen havaintoasemilta viiden päivän ajalta.</p>
          <p>Voit poistaa valmiina olevat esimerkkiasemat oikean yläkulman rastista ja lisätä uusia viimeisenä olevastat kortista.</p>
          <p>Oikealla ylhäällä sijaitsevasta lumihiutaleesta voit valita, että näytetäänkö haussa kaikki havaintoasemat vai vain ne, joista lumihavainto on saatavilla.</p>
          <p>Muutoksesi tallennetaan evästeeseen, joten ne säilyvät tällä laitteella.</p>
          <p>Viimeisimmän päivän lämpötila ei ole saatavilla kuin tiettyinä aikoina, sillä lämpötila-arvot ovat päivän keskiarvoja. Voit sen sijaan katsoa otsikkoriviltä tämänhetkisen lämpötilalukeman</p>
          <div className='topButton removeButton' onClick={toggleInfo}> <MdClear /> </div>
        </div>:
        ''
      }
    </div> 
  );
};

export default FreshSnowStations;