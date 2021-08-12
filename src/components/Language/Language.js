import './Language.css';
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { IoLanguageSharp, IoTriangle } from "react-icons/io5";

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

    return (
        <>
            <li className="language" onMouseLeave={()=>setVisibility(false)}>
                <span className="language-title" style={{height: heightTitle}} onClick={()=>{setVisibility(!visibility)}}>
                    <IoLanguageSharp style={{width:"20px", height:"20px" }}/>
                    <IoTriangle style={{transform: "rotate(180deg)", color:"#07b", width:"8px", height:"8px", marginLeft:"5px" }}/>
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