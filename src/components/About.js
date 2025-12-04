import React from 'react'
import CloseBtn from './CloseBtn';
import ExternalLink from './ExternalLink';
import '../css/About.css';
import { Link } from 'react-router-dom';

const About = () => {

	const closeButton = e => {
        document.getElementById("about").style.display="none";
    }


	return (
		<div id="about">
			<div className="text-contents">
				<Link to="/">
					<CloseBtn  />
				</Link>

				<h2>About this page</h2>
				<p>Your information is safe: this site never puts any of your information online. Any info you enter gets stored on your device, and never leaves.</p>
				<p>This site was made because most apps only allow one person's information to be added, and the author wanted a way to record lots of peoples' basic number charts in one place.</p>

				<h2>About the numbers</h2>
				<p>
					This site uses definitions from Rosemaree Templeton's " 
					<ExternalLink url="https://www.rockpoolpublishing.com/numerology">
						Numerology: Numbers And Their Influence
					</ExternalLink>
					" (ISBN13: 9781925429022), and from Matthew Oliver Goodwin's " 
					<ExternalLink url="https://www.goodreads.com/book/show/934801.Numerology_the_Complete_Guide_Volume_I">
						Numerology The Complete Guide, Volume I
					</ExternalLink>
					" (ISBN-13: 978-1564148599).
				</p>
				
				<h2>Contact</h2>
				<p>Please get in touch if you have any questions, comments or concerns, or if you'd like to say hi.</p>
				<p><a href="mailto:numerology@weatherheadonline.com">numerology@weatherheadonline.com</a></p>

				<h2>For web developers</h2>
				<p>This website was made using React. The github repository can be found here:</p>
				<p>
					<ExternalLink url="https://github.com/WeatherheadOnline/Number_tool">
						github.com/WeatherheadOnline/Number_tool
					</ExternalLink>
				</p>
			</div>
		</div>
	)
}

export default About
