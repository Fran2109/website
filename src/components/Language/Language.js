import './Language.css';
import Idiom from './../../assets/icons/idiom.png';
import { useTranslation } from "react-i18next";

const Language = ({listLanguages}) => {
    const[t, i18n] = useTranslation("global");

    return (
        <>
            <div className="language">
                <div className="language-title">
                    <img src={Idiom} alt="idiom"/>
                </div>
                
                <div className="language-list">
                    {listLanguages.map(language =>
                        <div className="language-item" key={language.id}>
                            <div className="language-name" onClick={() => i18n.changeLanguage(language.name)}>
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