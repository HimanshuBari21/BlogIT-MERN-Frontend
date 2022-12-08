import { TextField, Button, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const [alert, setAlert] = useState([true, ""])



	const loginStart = async (e) => {

		e.preventDefault();
		console.log("loginstart");

		await axios.post('http://localhost:5000/login', { email: email, password: password }).then((response) => {

			if (response.data.errMessage) {

				console.log(response.data.errMessage);
				setAlert([response.data.errMessage, true])

			}

			else if (response.data.emptyMessage) {
				console.log(response.data.emptyMessage);
				setAlert([response.data.emptyMessage, true])
			}

			else {

				console.log(response.data);

				localStorage.setItem("secret", response.data.message)
				window.location = "/profile"

			}

		}).catch((error) => {

			console.log(error);

		});

	}

	return (
		<>
			{alert[1] ? (<>{alert[0]}</>) : (<></>)}
			<Container maxWidth="sm" className='py-5'>
				<h1 className="text-center">Himanshu.LTD</h1>
				<br />
				<TextField id="outlined-basic" label="Email" type="email" variant="outlined" fullWidth required onChange={(e) => { setEmail(e.target.value) }} />
				<br />
				<br />
				<TextField id="outlined-basic" type="password" label="Password" variant="outlined" fullWidth required onChange={(e) => { setPassword(e.target.value) }} />
				<br />
				<br />
				<Button variant="contained" fullWidth onClick={loginStart}>
					<span className='h5 pt-2'>Login</span>
				</Button>
				<br />
				<br />
				<br />
				<h5 className='text-center'>Not Registered yet? <p onClick={() => { window.location = "/register" }} className="text-primary" style={{ cursor: "pointer" }}>Click here</p></h5>
			</Container>
		</>
	);
}

export default Login;