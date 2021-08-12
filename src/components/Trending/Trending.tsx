import React, { useState } from 'react';
import './Trending.css';
import { EuiPopover, EuiButton, EuiText } from '@elastic/eui';
import { useTranslation } from "react-i18next";
import { IoStatsChart } from "react-icons/io5";

const Trending = () => {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const[t] = useTranslation("global");

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);

  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButton style={{backgroundColor: "transparent"}} >
        <p style={{color: "white", fontWeight: "bold"}}>
          <IoStatsChart style={{width:"20px", height:"20px", color:"white"}} />
        </p>
    </EuiButton>
  );

  return (
    <div className="trending" onMouseEnter={onButtonClick} onMouseLeave={closePopover}>
      <EuiPopover
        panelStyle={{ opacity: 0.8 }}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <EuiText style={{ textAlign: "center", color: "white", fontSize:12 }}>
            {t("Header.Trending")}
        </EuiText>
      </EuiPopover>
    </div>
  );

}

export default Trending;