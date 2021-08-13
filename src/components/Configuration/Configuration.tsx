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
    const[rotate, setRotate] = useState(false);
    const[t] = useTranslation("global");
    useEffect(() => {
        const interval = setInterval(() => {
            getRandomInt(0,1)===0?
                <>
                {setRotate(true)}
                </>
                :
                setRotate(false);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return(
        <div className="configurationBtn" >
            <Link to={"/IHBox/configuration"}>
                <div className="configuration">
                    <EuiPopover
                        panelStyle={{ opacity: 0.8 }}
                        isOpen={rotate}
                        anchorPosition="downLeft"
                        button={rotate?
                           <IoSettingsSharp className="IoSettingsSharp" style={{color:"yellow", width:"20px", height:"20px"}}/>
                            :
                            <IoSettingsSharp style={{ color:"white", width:"20px", height:"20px"}}/>
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