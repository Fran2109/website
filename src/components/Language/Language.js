import './Language.css';
import Idiom from './../../assets/icons/idiom.png';

const Languaje = ({listLanguages}) => {
    return (
        <>
            <div className="language">
                <div className="language-title">
                    <img src={Idiom} alt="idiom"/>
                </div>
                
                <div className="language-list">
                    {listLanguages.map(language =>
                        <div className="language-item" key={language.id}>
                            <div className="language-name">
                                {language.name}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Languaje;