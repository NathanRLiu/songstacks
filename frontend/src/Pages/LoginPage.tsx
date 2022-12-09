import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import image from '../logingraphic.png';
import signupimage from '../signupgraphic2.png';
import logo from '../songstacks.png';
import LoginForm from '../Components/LoginForm';
import SignupForm from '../Components/SignupForm';
import axios from 'axios';
import styles from '../Styles/LoginPage.module.css'

function LandingPage() {
	const navigate = useNavigate();
	const [isSignup, setIsSignup] = useState(true)
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	async function onSubmit() {
		let response;
		if (isSignup) {
			response = await axios.post(`/api/signup`, {"username": email, "password": password}, { withCredentials: true });
		}
		else {
			response = await axios.post(`/api/login`, {"username": email, "password": password}, { withCredentials: true });
		}
		console.log(response);
		if ("Error" in response) {
			//show an error message somewhere
		}
		else {
			//redirect to dashboard
			navigate('/discover');
		}
	}
	React.useEffect(() => {
		const getUser = async () => {
			console.log("checking session");
			const response = await axios.get(`/api/login`, { withCredentials: true });
			console.log(response.data);
		}
		getUser();
	}, []);
	return (
		<>
		<div className={styles.dallecredit}>Images generated with OpenAI Dall-E. <br /> Sound wave <a href="https://www.freepik.com/free-vector/poster-sound-wave_17301774.htm#query=sound%20wave&position=8&from_view=keyword">Image by rorozoa</a> on Freepik.</div>
		<div className={ styles.background } >
			<div className={styles["form-full"]}>
				<div className={styles["form-scope"] +" "+ (isSignup?"":styles["animate-scope"])}>
					<div className={ styles["form-half"] +" "+ (isSignup?"":styles["animate-form"])}>
						<div className={ styles["form-container"]}>
							<LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={onSubmit}/>
							<div className={styles["switch-form-prompt"]}>
							Don't have an account? 
								<div className={styles["switch-link-container"]}>
								<Button onClick={()=>{setIsSignup(false)}} variant="link">Sign up.</Button>
								</div>
							</div>
						</div>
					</div>
					<div className={ styles["form-half-1"]  +" "+ (isSignup?"":styles["animate-form-1"])}>
						<div className={ styles["form-container"]}>
							<SignupForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={onSubmit}/>
							<div className={styles["switch-form-prompt"]}>
							Already have an account?
								<div className={styles["switch-link-container"]}>
								<Button onClick={()=>{setIsSignup(true)}} variant="link">Log in.</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles["image-full"]}>
				<div className={styles["image-scope"]}>
					<div className={styles["image-half"]}>
						<div className={styles["image-gradient"]} />
						<img className={styles["mountain-image"]} src={signupimage}></img>
					</div>
					<div className={styles["image-half-1"]}>
						<div className={styles["image-gradient-1"]} />
						<img src={image}></img>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}

export default LandingPage;
