import React, { useState } from 'react';
import { EuiPopover, EuiButton, EuiText } from '@elastic/eui';
import './Clock.css';

export default () => {

  const [hour, setHour] = useState(new Date().getHours()+":"+new Date().getMinutes());
  setInterval(()=>{setHour(new Date().getHours()+":"+new Date().getMinutes())}, 1000);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButton style={{backgroundColor: "#479dc4"}} onMouseEnter={onButtonClick} onMouseLeave={closePopover}>
      <p style={{color: "white", fontWeight: "bold"}}>{hour}</p>
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
          Time sincronized with server
        </EuiText>
      </EuiPopover>
    </div>
  );
};