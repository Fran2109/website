import './Configuration.css';
import Gear from './../../assets/icons/gear.png';

const Configuration = () => {
   /* var imageAddr = "http://www.tranquilmusic.ca/images/cats/Cat2.JPG" + "?n=" + Math.random();
    var startTime, endTime;
    var downloadSize = 5616998;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    startTime = (new Date()).getTime();
    download.src = imageAddr;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000; //Math.round()
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        alert("Your connection speed is: \n" + 
               speedBps + " bps\n"   + 
               speedKbps + " kbps\n" + 
               speedMbps + " Mbps\n" );
    } */
    return(
        <div className="configuration">
            <img src={Gear} alt="gear"/>
        </div>
    )
}

export default Configuration;