import './Language.css';
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { IoLanguageSharp } from "react-icons/io5";
import { VscTriangleDown } from "react-icons/vsc";
import useClickOutside from '../../utils/useClickOutside/useClickOutside';
import { useHistory } from "react-router-dom";

interface LanguageInterface{
    id: number;
    name: string;
    label: string;
}

const Language = ({heightTitle="50px"}) => {
    const [languages, setLanguages] = useState<LanguageInterface[]>(); 
    const [t, i18n] = useTranslation("global");
    const [visibility, setVisibility] = useState(false);
    
    useEffect(() => {
        const getLanguages = new Promise<LanguageInterface[]>((resolve, reject) => {
            resolve([
                { id: 0, name: "ES", label:"Español" },
                { id: 1, name: "EN", label:"English" },
                { id: 2, name: "PT", label:"Português" }])
        });
        getLanguages.then(
            ( result ) => {
                setLanguages(result);
            }
        )
        return () => setLanguages([]);
    }, []);
    
    /* let domNode = useClickOutside(() => {
        setVisibility(false);
    }); */

    let history = useHistory();
    return (
        <>
            <li className="language"  /* ref={domNode} */ >
                <span className="language-title" style={{height: heightTitle}} onClick={()=>{setVisibility(!visibility)}}>
                    <IoLanguageSharp className="languageIcon"/>
                    {history.location.pathname!=="/Login"?
                    <>
                        {sessionStorage.getItem("Language")!==null?
                            languages!==undefined? languages.map(language=>{
                                return(
                                    language.name === sessionStorage.getItem("Language")?
                                        <p key={language.id}>{language.label}</p>:null
                                )
                            }) : null
                        :<p>English</p>}
                        <VscTriangleDown className="IoTriangle"/>
                    </>
                    :
                    null}
                </span>
                <ul className={visibility? "language-list visible" : "language-list hidden"}>
                    {languages!==undefined? languages.map(language =>
                        <li className="language-item" key={language.id} onClick={() => {
                                                                    i18n.changeLanguage(language.name); 
                                                                    sessionStorage.setItem('Language', language.name);
                                                                    setVisibility(false)}}>
                            {t("")+language.name}
                        </li>
                    ):null}
                </ul>
            </li>
        </>
    )
}

export default Language;