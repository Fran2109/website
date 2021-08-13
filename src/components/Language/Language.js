import './Language.css';
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { IoLanguageSharp, IoTriangle } from "react-icons/io5";
import useClickOutside from './../../utils/useClickOutside/useClickOutside';

const Language = ({heightTitle="50px"}) => {
    const [languages, setLanguages] = useState([]); 
    const [t, i18n] = useTranslation("global");
    const [visibility, setVisibility] = useState(false);
    const getLanguages = new Promise((resolve, reject) => {
        resolve([
            { id: 0, name: "ES" },
            { id: 1, name: "EN" },
            { id: 2, name: "PT" }])
    });
    useEffect(() => {
        getLanguages.then(
            result => {
                setLanguages(result);
            }
        )
    }, []);
    let domNode = useClickOutside(() => {
        setVisibility(false);
      });
    return (
        <>
            <li className="language"  ref={domNode}/* onMouseLeave={()=>setVisibility(false)} */>
                <span className="language-title" style={{height: heightTitle}} onClick={()=>{setVisibility(!visibility)}}>
                    <IoLanguageSharp style={{width:"20px", height:"20px" }}/>
                    <IoTriangle className="IoTriangle"/>
                </span>
                <ul className={visibility? "language-list visible" : "language-list hidden"}>
                    {languages.map(language =>
                        <li className="language-item" key={language.id} onClick={() => {
                                                                    i18n.changeLanguage(language.name); 
                                                                    sessionStorage.setItem('Language', language.name);
                                                                    setVisibility(false)}}>
                            {language.name}
                        </li>
                    )}
                </ul>
            </li>
        </>
    )
}

export default Language;