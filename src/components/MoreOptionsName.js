import { useEffect } from 'react';
import Tooltip from './Tooltip';
import ExternalLink from './ExternalLink';

const MoreOptionsName = ({state, nameOptionsHandler, customWHandler, customYHandler, nameChecked, toggleCollapsed}) => {

    // const toggleCollapsed = e => {
    //     const moreOptions = e.target.nextSibling;
    //     if (moreOptions.style.display === "block") {
    //         moreOptions.style.display = "none";
    //     } else {
    //         moreOptions.style.display = "block";
    //     }
    // };

    // useEffect(() => {
    //     const moreOptions = document.getElementById("hidden-options");
    //     if(!nameChecked) {
    //         console.log("Unchecked: need to hide!")
    //         // moreOptions.style.display = "none";
    //     }
    // }, [nameChecked]);

    return (
        <div>
            <div className="collapse-btn" onClick={toggleCollapsed}>More options</div>
            <div className="hidden-options" >
                To calculate soul number:
                <label htmlFor="vowels-only" className="block-element">
                    <input type="radio" id="vowels-only" name="name-options" value="vowels-only" checked={state.nameOptions==="vowels-only"} onChange={nameOptionsHandler} />
                    Only include A-E-I-O-U
                </label>

                <label htmlFor="some-Ws-Ys" className="block-element">
                    <input type="radio" id="some-Ws-Ys" name="name-options" value="some-Ws-Ys" checked={state.nameOptions==="some-Ws-Ys"} onChange={nameOptionsHandler} />
                    Include some Ws and Ys
                    <Tooltip wrapperTag="p" visibleText="?" >
                        <p>
                            Following the guidelines by Matthew Oliver Goodwin in "Numerology the Complete Guide, Volume I: The Personality Reading". W is a vowel when it is preceded by a natural vowel and pronounced together as one sound. Y is a vowel when there is no other vowel in a syllable, or when it is preceded by a natural vowel and pronounced together as one sound.&nbsp;
                            <ExternalLink url="https://www.goodreads.com/book/show/934801.Numerology_the_Complete_Guide_Volume_I">
                                ISBN-13: 978-1564148599
                            </ExternalLink>
                        </p>
                    </Tooltip>
                </label>
                
                <label htmlFor="custom-Ws-Ys" className="block-element">
                    <input type="radio" id="custom-Ws-Ys" name="name-options" value="custom-Ws-Ys" checked={state.nameOptions==="custom-Ws-Ys"} onChange={nameOptionsHandler} />
                    Custom
                </label>

                <div id="customWYinput">
                    <label className="block-element">This many Ws
                        <input type="number" id="customWs" value={state.customWs} onChange={customWHandler} maxLength={2} min={0} max={20} className="input-2ch" />
                    </label>
                    <label className="block-element">This many Ys
                        <input type="number" id="customYs" value={state.customYs} onChange={customYHandler} maxLength={2} min={0} max={20} className="input-2ch" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default MoreOptionsName;