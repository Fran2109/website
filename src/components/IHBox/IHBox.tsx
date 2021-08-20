import './IHBox.css';
import Header from '../Header/Header';
import Logo from './../../assets/images/logo.png';

const IHBox = () => {
    /* {fetch('https://localhost:44358/WeatherForecast')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })} */
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