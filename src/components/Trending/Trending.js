import React, { useState } from 'react';
import './Trending.css';
import { EuiPopover, EuiButton, EuiText } from '@elastic/eui';
import Graphic from './../../assets/icons/graphic.png';
import { useTranslation } from "react-i18next";

const Trending = () => {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const[t/* , i18n */] = useTranslation("global");

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);

  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButton style={{backgroundColor: "transparent"}} >
        <p style={{color: "white", fontWeight: "bold", }}>
            <img src={Graphic} alt="graphic"/>
        </p>
    </EuiButton>
  );

  return (
    <div className="trending" onMouseEnter={onButtonClick} onMouseLeave={closePopover}>
      <EuiPopover
        panelStyle={{ backgroundColor: "black", opacity: 0.8 }}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <EuiText style={{ width: 80, textAlign: "center", color: "white", fontSize:12 }}>
            {t("Header.Trending")}
        </EuiText>
      </EuiPopover>
    </div>
  );

}

export default Trending;