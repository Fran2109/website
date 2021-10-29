import { React, useState, useEffect, useContext } from 'react';

import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import Clock from '../Clock/Clock.js';
import Trending from './../Trending/Trending.tsx';
import Language from './../Language/Language.tsx';
import Configuration from './../Configuration/Configuration.tsx';
import MenuOpen from './../../assets/icons/menuOpen.png';
import MenuClose from './../../assets/icons/menuClose.png';
import User from '../User/User';
import DBContext from '../../context/DBContext';
import useWindowSize from '../../utils/useWindowSize/useWindowSize';

interface DBInterface{
    headerOptions: any;
    trendingOption: any;
    configurationOptions: any;
}

const Header = () => {
    const [width] = useWindowSize();
    const[menuOptions, setMenuOptions] = useState();
    const[trendingOption, setTrendingOption] = useState();
    const [visibility, setVisibility] = useState(false);
    const DB= useContext(DBContext);
    useEffect(() => {
        setMenuOptions(DB.headerOptions);
        setTrendingOption(DB.trendingOption);
    }, [DB])   
    const changeVisibility = () => {
        setVisibility(!visibility);
    }

    const HeaderBasic = () => {
        return (
            <>
                <ul className="headerLeft">
                    {console.log(DB)}
                    {menuOptions!==undefined?
                        menuOptions.map((option) => {
                            return( 
                                <div className="items" key={option.Id}>
                                    <MenuItem item={option}/>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </ul>

                <div className="headerRight">
                    {
                        trendingOption!==undefined?
                            <Trending/>
                        :
                            null
                    }
                    <User/>
                    <Clock/>
                    <Language/>
                    <Configuration/>
                </div>
            </>
        )
    }

    return (
        <div className="header">
            { width > 1000?
                 <HeaderBasic />
                :
                <>
                    <div className="headerMobile">
                        <button className="menu" onClick={changeVisibility}>
                            {!visibility?
                                <img src={MenuOpen} alt="menuOpen"/>
                            :
                                <img src={MenuClose} alt="menuClose"/>
                            }
                        </button>
                    </div>
                    {visibility?
                        <HeaderBasic />
                    :
                        null
                    }
                </>
            }
        </div>
    )
};

export default Header;