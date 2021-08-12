import './Configuration.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from "react-icons/io5";
import { EuiPopover, EuiText } from '@elastic/eui';
import { useTranslation } from "react-i18next";

const Configuration = () => {
    function getRandomInt(min:number, max:number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    let random=0;
    const closePopover = () => setIsPopoverOpen(false);
    const[rotate, setRotate] = useState(false);
    const[t] = useTranslation("global");
    useEffect(() => {
        const interval = setInterval(() => {
            random = getRandomInt(0,6);  
            random==0?
                setRotate(true)
                :
                setRotate(false);
        }, 10000);
        return () => clearInterval(interval);
      }, []);

    return(
        <div className="configurationBtn" >
            <Link to={"/IHBox/configuration"}>
                <div className="configuration">
                    <EuiPopover
                        panelStyle={{ opacity: 0.8 }}
                        isOpen={rotate}
                        closePopover={closePopover}
                        button={rotate?
                            <IoSettingsSharp style={{ transform: "rotate(720deg)", transitionDuration: "10s", color:"yellow", width:"20px", height:"20px"}}/>
                            :
                            <IoSettingsSharp style={{ transform: "rotate(0deg)", transitionDuration: "0.1s", color:"white", width:"20px", height:"20px"}}/>
                            }
                        >
                        <EuiText style={{ width: 120, textAlign: "center", color: "white", fontSize:12, margin:"5px"}}>
                        {t("ConfigurationBtn")}
                        </EuiText>
                    </EuiPopover>
                </div>
            </Link>
        </div>
    )
}

export default Configuration;