import './Language.css';
import Idiom from './../../assets/icons/idiom.png';
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';

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
            <div className="language">
                <div className="language-title" style={{height: heightTitle}}>
                    <img src={Idiom} alt="idiom"/>
                </div>
                <div className="language-list">
                    {languages.map(language =>
                        <div className="language-item" key={language.id}>
                            <div className="language-name" onClick={() => {i18n.changeLanguage(language.name); sessionStorage.setItem('Language', language.name)}}>
                                {language.name}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Language;