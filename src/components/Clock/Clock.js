import React, { useState, useEffect } from 'react';
import { EuiPopover, EuiButton, EuiText } from '@elastic/eui';
import './Clock.css';
import { useTranslation } from "react-i18next";
import clockData from './../../data/clockData';

const Clock = () => {
  const [time, setTime] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const[t] = useTranslation("global");
  
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      var QP = new window.Core.Database.QueryParameters();
      window.Core.Json.CallProcedure("FRONTEND.SyncTimeWithServer", QP, {
        onSuccess: function (data) {

          //let time=clockData.Table[0].TimeStamp;
          let time=data.Table[0].TimeStamp;
          let year=time[0]+time[1]+time[2]+time[3];
          let month=time[5]+time[6]-1;
          let day=time[8]+time[9];
          let hour=time[11]+time[12];
          let minute=time[14]+time[15];
          let second=time[17]+time[18];
          let date = new Date(year, month, day, hour, minute, second);
          setTime((date.getHours()<10?"0"+date.getHours():date.getHours())+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()))
        },
        Async: false
      }, "APP");
      return () => clearInterval(interval);
    }, 1000);
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