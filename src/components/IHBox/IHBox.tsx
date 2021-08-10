import './IHBox.css';
import Header from '../Header/Header';
import Logo from './../../assets/images/logo.png';

const IHBox = () => {
    return (
        <div className="IHBox">
            <Header />
                <div className="Logo">
                    <img src={Logo} alt="Logo" />
                </div>
        </div>
    );
}

export default IHBox;