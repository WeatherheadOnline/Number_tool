import {useState} from 'react';
import './ModeButtons.css';

const ModeButtons = ({getTheme, themeOptions, initialState}) => {

    const [active, setActive] = useState(initialState);
 
    const handleClick = e => {
        getTheme(e.target.id);
        setActive(e.target.id);
    };
    
  return (
    <div className="modes-wrapper">
       {themeOptions.map((theme) => {
        const classNames = 'mode-button ' + (active === theme.themeName ? "active" : "");
        return (
           <div 
                className={classNames}
                id={theme.themeName} 
                key={theme.key} 
                onClick={handleClick}
            ></div>
        )})}
    </div>
  );
};

export default ModeButtons;