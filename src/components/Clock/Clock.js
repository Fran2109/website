import React, { useState, useEffect } from 'react';
import { EuiPopover, EuiButton, EuiText } from '@elastic/eui';
import './Clock.css';
import { useTranslation } from "react-i18next";
import clockData from './../../data/clockData';

const Clock = () => {
  useEffect(() => {
    function setFromDate(date){
      var jsonObj = {};
      console.log(date);
      console.log(date[11]);
      /* _.extend(jsonObj, this.attributes); 
      jsonObj.hours = date.getHours();
      jsonObj.minutes = date.getMinutes();
      jsonObj.seconds = date.getSeconds();
      jsonObj.string_hours = this.format(jsonObj.hours);
      jsonObj.string_minutes = this.format(jsonObj.minutes);
      jsonObj.string_seconds = this.format(jsonObj.seconds); */

      //change method is fired.
      /* this.set(this.parse(jsonObj), {}); */
      return jsonObj;
    }
    var QP = new window.Core.Database.QueryParameters(); 
    window.Core.Json.CallProcedure("FRONTEND.SyncTimeWithServer", QP, {
      onSuccess: function (data) {
        /* console.log(data); */
        data = clockData;
        console.log(data);
        data = data.Table[0]; 
        console.log(data);
        var date = data.TimeStamp; 
        /* console.log(date);
        var now = window.Core.DateTime.Parse(date); */
        console.log(setFromDate(date)); 
      },
      Async: false
    }, "APP");
  }, []);

  const [time, setTime] = useState((new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+(new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()));
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const[t] = useTranslation("global");
  
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
    setTime((new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+(new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()))
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  

  const button = (
    <EuiButton style={{backgroundColor: "transparent"}} >
      <p style={{color: "white", fontWeight: "bold"}}>{time}</p>
    </EuiButton>
  );

  return (
    <div className="clock" onMouseEnter={onButtonClick} onMouseLeave={closePopover}>
      <EuiPopover
        panelStyle={{ opacity: 0.8 }}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <EuiText style={{ width: 120, textAlign: "center", color: "white", fontSize:12, margin:"2px 10px" }}>
          {t("Header.Time")}
        </EuiText>
      </EuiPopover>
    </div>
  );
};

export default Clock;