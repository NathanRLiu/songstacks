import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import image from '../logingraphic.png';
import logo from '../songstacks.png';

import styles from '../Styles/LoginPage.module.css'
interface FormInput {
	email: string;
	setEmail: Function;
	password: string;
	setPassword: Function;
	onSubmit: Function;
}
function LoginForm(props:FormInput) {
        return (
		<>
		    <Form>
		      <Form.Group className="mb-3" controlId="formBasicEmail">
			
			<h1>Login <img src={logo} className={styles["songstacks-logo"]}/></h1>

			<Form.Label className={styles["form-label"]}>Email address</Form.Label>
			<Form.Control className={styles["form-input"]}type="email" placeholder="Enter email" value={props.email} onChange={(event)=> props.setEmail(event.target.value)}/>
			<Form.Text className="text-muted">
			  We'll never share your email with anyone else.
			</Form.Text>
		      </Form.Group>

		      <Form.Group className="mb-3" controlId="formBasicPassword">
			<Form.Label className={styles["form-label"]}>Password</Form.Label>
			<Form.Control className={styles["form-input"]} type="password" placeholder="Password" value={props.password} onChange={(event)=> props.setPassword(event.target.value)}/>
		      </Form.Group>
		      <Form.Group className="mb-3" controlId="formBasicCheckbox">
			<Form.Check className={styles["form-label"]} type="checkbox" label="Remember me" />
		      </Form.Group>
		      <div className={"d-grid gap-2 "+styles["form-button-container"]}>
			      <Button variant="outline-primary" type="submit" onClick={()=> props.onSubmit()}>
					Log in
			      </Button>
			      <Button variant="outline-secondary">
				      Forgot Password
				</Button>
			</div>
		    </Form>	
		</>
        );
}

export default LoginForm;
