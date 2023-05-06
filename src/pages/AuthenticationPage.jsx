import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { Form, Link, json, redirect, useActionData, useSearchParams } from "react-router-dom";
import classes from './AuthenticationPage.module.css';
import Slider from "../components/Slider";
import { orange } from "@mui/material/colors";
import { djangoInstance, fireBaseInstance } from "../utils/axios-config";

function AuthenticationPage() {
    const [searchParams] = useSearchParams();
    const actionData = useActionData();
    const isLogin = searchParams.get('mode') === 'login';


    return (
        <Box className={classes.container} >
            <Stack direction={isLogin ? 'row' : 'row-reverse'} className={classes.form}>
                <Box className={classes.authentication}>
                    <Link to="/">
                        <Typography marginBottom={3} >Cardiff</Typography>
                    </Link>
                    <Typography variant="h3" gutterBottom>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Typography>
                    <Typography variant="h6" fontWeight={100} marginBottom={3}>
                        {
                            isLogin ?
                                'Login to access your Cardiff account' :
                                "Let's get you all set up so you can access your personal account"
                        }
                    </Typography>
                    <Form method="post">
                        <Stack gap={2}>
                            <Typography variant="subtitle1" color={orange[900]}>{actionData?.message ?? ''}</Typography>
                            {
                                !isLogin &&
                                <Stack direction="row" gap={3}>
                                    <TextField required sx={{ flex: 1 }} label="First Name" name="firstname" />
                                    <TextField required sx={{ flex: 1 }} label="Last Name" name="lastname" />
                                </Stack>
                            }
                            <TextField required label="Username" name="username" />
                            {!isLogin && <TextField required label="Email" name="email" />}
                            <TextField required type="password" label="Password" name="password" />
                            {!isLogin && <TextField required type="password" label="Confirm Password" name="confirmPassword" />}
                            {!isLogin && <FormControlLabel control={<Checkbox name="rememberMe" />} label="I agree to all the Terms and Privacy Policies " />}

                            {isLogin && <Stack direction="row" justifyContent="space-between" marginBottom={3}>
                                <FormControlLabel control={<Checkbox name="rememberMe" />} label="Remember Me" />
                                <Link to="/">
                                    <Button color="warning">
                                        forgot password
                                    </Button>
                                </Link>
                            </Stack>}
                            <Button type="submit" variant="contained" data-type="stagnant" sx={{
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}>{isLogin ? 'Login' : 'Create account'}</Button>
                        </Stack>
                    </Form>
                    {isLogin && <Stack direction="row" alignItems="center" justifyContent="center">
                        <Typography>Don't have an account?</Typography>
                        <Link to="/auth?mode=signup">
                            <Button color="warning">
                                Sign up
                            </Button>
                        </Link>
                    </Stack>}

                    {!isLogin && <Stack direction="row" alignItems="center" justifyContent="center">
                        <Typography>Already have an account?</Typography>
                        <Link to="/auth?mode=login">
                            <Button color="warning">
                                Login
                            </Button>
                        </Link>
                    </Stack>}
                </Box>
                <Box className={classes.sliderBox}>
                    <Slider />
                </Box>
            </Stack>
        </Box>
    );
}

export default AuthenticationPage;

async function login(formData) {
    const payLoad = {
        username: formData.get('username').toLowerCase(),
        password: formData.get('password'),
    }


    const { data: user } = await fireBaseInstance(`users/${payLoad.username}.json`);
    if (!user) {
        throw { message: 'user not found' }
    }


    if (user.password !== btoa(payLoad.password)) throw { message: 'invalid credential' }


    localStorage.setItem('token', btoa(`${user.email}-${user.first_name}-${user.last_name}`));
    localStorage.setItem('id', btoa(user.username));
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());


}

export async function action({ request }) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'signup';
    const formData = await request.formData();
    const confirmPassword = formData.get('confirmPassword');


    try {
        if (mode === 'signup') {
            const payLoad = {
                first_name: formData.get('firstname').toLowerCase(),
                last_name: formData.get('lastname').toLowerCase(),
                username: formData.get('username').toLowerCase(),
                password: formData.get('password'),
                email: formData.get('email').toLowerCase(),
            }

            if (payLoad.password.length < 8) return { message: 'password must be at least 8 characters' };
            if (payLoad.password !== confirmPassword) return { message: 'passwords must match' };

            // await djangoInstance.post('api/users/', payLoad);
            await fireBaseInstance.put(`users/${payLoad.username}.json`, {
                ...payLoad,
                password: btoa(payLoad.password),
                address: '',
                dob: '',
                profile_photo: '',
                background_photo: '',
                id: btoa(payLoad.username)
            })
            await login(formData);

        }

        if (mode === 'login') {
            await login(formData);
        }

        return redirect('/');
    } catch (error) {

        if (error.message) {
            return json({ message: error.message }, { status: 422 })
        }

        if (error.response) {
            const { data } = error.response;
            const message = Object.values(data);
            return json({ message }, { status: 422 })
        }

        return json({ message: 'Invalid Credentials' }, { status: 422 })
    }

}