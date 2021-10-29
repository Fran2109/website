import './Language.css';
import { useTranslation } from "react-i18next";
import React, { useRef,  useState, useEffect } from 'react';
import { IoLanguageSharp } from "react-icons/io5";
import { VscTriangleDown } from "react-icons/vsc";
import { useHistory } from "react-router-dom";
import { useOnClickOutside } from 'usehooks-ts'
import { LanguageInterface } from '../../utils/interfaces/interfaces';

const Language = ({heightTitle="50px"}) => {
    const [languages, setLanguages] = useState<LanguageInterface[]>(); 
    const [t, i18n] = useTranslation("global");
    const [visibility, setVisibility] = useState(false);
    const ref = useRef(null)

    const handleClickOutside = () => {
        setVisibility(false);
    }
    useOnClickOutside(ref, handleClickOutside)
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

    let history = useHistory();
    return (
        <>
            <li className="language"  >
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
                <ul ref={ref} className={visibility? "language-list visible" : "language-list hidden"}>
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