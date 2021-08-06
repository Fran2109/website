import './Configuration.css';
import Gear from './../../assets/icons/gear.png';
/* import { EuiIcon } from '@elastic/eui'; */

const Configuration = () => {
    return(
        <div className="configuration">
            {<img src={Gear} alt="gear"/>}
            {/* <EuiIcon type="gear" size="l" aria-hidden={true} color="white" /> */}
        </div>
    )
}

export default Configuration;