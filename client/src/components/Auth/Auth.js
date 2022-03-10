import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import Icon from "./icon";
import { signin, signup } from "../../redux/actions/auth";
import { AUTH } from "../../redux/constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = { fullName: "", email: "", password: "" };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography
            component="h4"
            variant="h7"
            sx={{ fontSize: "16px" }}
            className={classes.typography}
          >
            {isSignup
              ? "Sign Up and Start Learning!"
              : "Log In to Your Udemy Account!"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div style={{ marginBottom: "5px" }}>
              <Grid container spacing={1}>
                {!isSignup && (
                  <Grid>
                    <div style={{ marginBottom: "10px", width: "365px" }}>
                      <Button
                        sx={{
                          backgroundColor: "white",
                          textTransform: "none",
                          color: "black",
                          borderRadius: 0,
                          "&:hover": {
                            background: "white",
                          },
                        }}
                        className={classes.googleButton}
                        fullWidth
                        variant="contained"
                        startIcon={<FacebookOutlinedIcon />}
                      >
                        Continue with Facebook
                      </Button>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <GoogleLogin
                      clientId="160612781304-b74316niimiumhotk80d6g5u999iu6bp.apps.googleusercontent.com"
                       render={(renderProps) => (
                          <Button
                            sx={{
                              backgroundColor: "white",
                              textTransform: "none",
                              color: "black",
                              borderRadius: 0,
                              "&:hover": {
                                background: "white",
                              },
                            }}
                            className={classes.googleButton}
                            startIcon={<Icon />}
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            variant="contained"
                          >
                            Continue with Google
                          </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                      />
                    </div>
                    <Button
                      sx={{
                        backgroundColor: "white",
                        textTransform: "none",
                        color: "black",
                        borderRadius: 0,
                        "&:hover": {
                          background: "white",
                        },
                      }}
                      className={classes.googleButton}
                      fullWidth
                      variant="contained"
                      startIcon={<AppleIcon />}
                    >
                      Continue with Apple
                    </Button>
                  </Grid>
                )}
                {isSignup && (
                  <>
                    <div style={{ marginTop: "-5px", width: "370px"}}>
                      <Input
                        name="fullName"
                        size="small"
                        label="Full Name"
                        handleChange={handleChange}
                        className={classes.inputCont}
                      />
                    </div>
                  </>
                )}
                <div
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    width: "370px",
                  }}
                >
                  <Input
                    name="email"
                    label="Email Address"
                    handleChange={handleChange}
                    type="email"
                    className={classes.inputCont}
                  />
                </div>
                <div style={{ width: "370px" }}>
                  <Input
                    name="password"
                    label="Password"
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                    className={classes.inputCont}
                  />
                </div>
              </Grid>
            </div>
            {isSignup && (
              <>
                <input type="checkbox" /> I’m in for emails with exciting
                discounts and personalized recommendations
                <div style={{ marginTop: "10px" }}></div>
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "rgb(164,53,240)",
                textTransform: "none",
                "&:hover": {
                  background: "rgb(164,80,240)",
                },
              }}
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
            <div style={{ marginTop: "10px" }}></div>
            {isSignup && (
              <>
                <GoogleLogin
                  clientId="160612781304-b74316niimiumhotk80d6g5u999iu6bp.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      className={classes.googleButton}
                      fullWidth
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<Icon />}
                      sx={{
                        backgroundColor: "white",
                        textTransform: "none",
                        color: "black",

                        "&:hover": {
                          background: "white",
                        },
                      }}
                      variant="contained"
                    >
                      Google Sign In
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
              </>
            )}
            <div style={{ marginTop: "10px" }}></div>
            <Typography
              component="div"
              variant="h7"
              className={classes.typography2}
            >
              By signing up, you agree to our{" "}
              <span style={{ color: "blue" }}>Terms of Use</span> and{" "}
              <span style={{ color: "blue" }}>Privacy Policy</span>.
            </Typography>
            <Grid container justify="flex-end">
              <Grid item>
                <Button sx={{textTransform: "none"}} onClick={switchMode} className={classes.btn}>
                  {isSignup
                    ? `Already have an account? Sign in`
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default SignUp;
