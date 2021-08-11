import './Language.css';
import Idiom from './../../assets/icons/idiom.png';
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { IoLanguageSharp } from "react-icons/io5";

const Language = ({heightTitle="50px"}) => {
    const [languages, setLanguages] = useState([]); 
    const[t, i18n] = useTranslation("global");

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
            <li className="language">
                <span className="language-title" style={{height: heightTitle}}>
                    <IoLanguageSharp style={{width:"20px", height:"20px" }}/>
                </span>
                <ul className="language-list">
                    {languages.map(language =>
                        <li className="language-item" key={language.id} onClick={() => {i18n.changeLanguage(language.name); sessionStorage.setItem('Language', language.name)}}>
                            {language.name}
                        </li>
                    )}
                </ul>
            </li>
        </>
    )
}

export default Language;