import React from 'react'

const About = () => {

	const closeButton = e => {
        document.getElementById("about").style.display="none";
    }


	return (
		<div id="about">
			<div className="text-contents">
                <div className="close-btn cursor-pointer" onClick={closeButton}>
                    <span>&times;</span>
                </div>

				<h2>About this page</h2>
				<p>Your information is safe: this site never puts any of your information online. Any info you enter gets stored on your device, and never leaves.</p>
				<p>This site was made because most apps only allow one person's information to be added, and the author wanted a way to record lots of peoples' basic number charts in one place.</p>
				<h2>Contact</h2>
				<p>Please get in touch if you have any questions, comments or concerns, or if you'd like to say hi.</p>
				<p><a href="mailto:numerology@weatherheadonline.com">numerology@weatherheadonline.com</a></p>
			</div>
		</div>
	)
}

export default About
