import React from 'react';
import { BrowserRouter, Route, useNavigate } from 'react-router-dom';
import { GiMicrophone } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi2';
import { ImHeadphones } from 'react-icons/im';
import logo from '../songstacks.png';

import styles from '../Styles/LandingPage.module.css'

function LandingPage() {
		let navigate = useNavigate();
		return (
		<div className={ styles.background }>
			<div className={ styles.diffuser }>
				<div className={ styles.glow1 + " " + styles.glow } />
				<div className={ styles.glow2 + " " + styles.glow } />
				<div className={ styles.glow3 + " " + styles.glow } />
				<div className={ styles.glow4 + " " + styles.glow } />
				<div className={ styles.glow5 + " " + styles.glow } />
			</div>
			<div className={ styles["title-text"] }>
				<h1>Introducing SongStacks.</h1>
			</div>
			<p className={styles["description-text"]}> Let's redefine the music industry.</p>
			<div className={ styles.section2 }>
				<div className={ styles.card }>
					<i className={ styles.icon }><GiMicrophone /></i>
					<p className={ styles.description }>
						SongStacks lets new artists upload their work and start making money from it right away
					</p>
				</div>
				<div className={ styles.card }>
					<i className={ styles.icon }> <HiUserGroup /> </i>
					<p className={ styles.description }>
						SongStacks makes it easy to find other people to collaborate with!
					</p>
				</div>
				<div className={ styles.card }>
					<i className={ styles.icon }> <ImHeadphones /> </i>	
					<p className={ styles.description }>
						SongStacks lets you easily discover new music from the genres you love
					</p>
				</div>
			</div>
			<div className={ styles.section3 }>
				<h2> Ready to get started? </h2>
				<div className={ styles.buttons }>
					<button onClick={
						() => {navigate("/login")}
					}> Start Creating </button>
					<button> Start Listening </button>
				</div>
			</div>
		</div>
        );
}

export default LandingPage;
