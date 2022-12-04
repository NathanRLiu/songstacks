import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import image from '../logingraphic.png';
import logo from '../songstacks.png';

import styles from '../Styles/LoginPage.module.css'

function LandingPage() {
        return (
		<>
		<div className={styles.dallecredit}>Image generated with OpenAI Dall-E</div>
		<div className={ styles.background } >
			<div className={ styles["form-half"] }>
				<div className={ styles["form-container"]}>
				    <Form>
				      <Form.Group className="mb-3" controlId="formBasicEmail">
				      	
				      	<h1>Login <img src={logo} className={styles["songstacks-logo"]}/></h1>
					<Form.Label className={styles["form-label"]}>Email address</Form.Label>
					<Form.Control className={styles["form-input"]}type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
					  We'll never share your email with anyone else.
					</Form.Text>
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label className={styles["form-label"]}>Password</Form.Label>
					<Form.Control className={styles["form-input"]} type="password" placeholder="Password" />
				      </Form.Group>
				      <Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check className={styles["form-label"]} type="checkbox" label="Remember me" />
				      </Form.Group>
				      <div className={"d-grid gap-2 "+styles["form-button-container"]}>
					      <Button variant="outline-primary" type="submit">
						Log in
					      </Button>
					      <Button variant="outline-secondary">
						      Forgot Password
						</Button>
					</div>
				    </Form>	
				</div>
			</div>
			<div className={styles["image-container"]}>
				<div className={styles["image-gradient"]} />
				<img src={image}></img>
			</div>
		</div>
		</>
        );
}

export default LandingPage;
