import './LogIn.css';
import User from './../../assets/icons/user.png';

const LogIn = () => {
    return (
        <div className="LogIn">
            <div className="LogInContainer">
                <div className="LogInIco">
                    <img src={User} alt="User" />
                </div>
                <div className="LogInContent">
                    <form className="Form">
                        <label>
                            <input type="text" placeholder="Username" style={{textAlign: "center"}} />
                        </label>
                        <label>
                            <input type="password" placeholder="Password" style={{textAlign: "center"}} />
                        </label>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn;