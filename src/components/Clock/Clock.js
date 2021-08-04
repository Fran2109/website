import React, { useState, useEffect } from 'react';
import { EuiPopover, EuiButton, EuiText } from '@elastic/eui';
import './Clock.css';
import { useTranslation } from "react-i18next";

const Clock = () => {

  const [time, setTime] = useState(new Date().getHours()+":"+new Date().getMinutes());
  const [tick, setTick] = useState(new Date().getSeconds())
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const[t/* , i18n */] = useTranslation("global");

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  let minutes = new Date().getMinutes();
  let hours = new Date().getHours();
  
  setInterval(() => {setTick(new Date().getSeconds())}, 1000);

  useEffect(() => {
    hours = new Date().getHours()<10?
          "0"+new Date().getHours()
          :
          new Date().getHours()
    minutes = new Date().getMinutes()<10?
            "0"+new Date().getMinutes()
            :
            new Date().getMinutes()
    setTime(hours+":"+minutes)
  }, [tick])
  
  const button = (
    <EuiButton style={{backgroundColor: "#479dc4"}} onMouseEnter={onButtonClick} onMouseLeave={closePopover}>
      <p style={{color: "white", fontWeight: "bold"}}>{time}</p>
    </EuiButton>
  );

  return (
    <div className="clock">
      <EuiPopover
        panelStyle={{ backgroundColor: "black", opacity: 0.8 }}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <EuiText style={{ width: 120, textAlign: "center", color: "white", fontSize:12 }}>
          {t("Header.Time")}
        </EuiText>
      </EuiPopover>
    </div>
  );
};

export default Clock;