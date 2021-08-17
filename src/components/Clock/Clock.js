import React, { useState, useEffect } from 'react';
import { EuiPopover, EuiButton, EuiText } from '@elastic/eui';
import './Clock.css';
import { useTranslation } from "react-i18next";

const Clock = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [time, setTime] = useState(/* new Date().toLocaleTimeString() */);
  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const[t] = useTranslation("global");
  
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      new Date().getHours()<10?
        setHours("0"+new Date().getHours()):setHours(new Date().getHours())
      new Date().getMinutes()<10?
        setMinutes("0"+new Date().getMinutes()):setMinutes(new Date().getMinutes())
      setTime(hours+":"+minutes)
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