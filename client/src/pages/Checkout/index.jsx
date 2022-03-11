import * as React from 'react';
import Container from '@mui/material/Container';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import OutlinedBtn from '../../components/Buttons/OutlinedBtn';
import { displayRazorpay } from '../../components/Razorpay/payment';
import { emptyCart, fetchCart } from '../../redux/actions/cart';
import { CircularProgress } from '@mui/material';
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useHistory } from "react-router-dom";

export function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

const addCommas = (num) => {
    return Number(num.toFixed(2)).toLocaleString('en');
}

const stateList = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];

const initState = {
    country: "india",
    name: "",
    card: "",
    state: "",
    number: "",
    expiry: "",
    year: "",
    cvv: "",
    method: "card",
    remember: "true"
}

const Checkout = () => {
    const [state, setState] = React.useState(initState);
    const { cart, total, isLoading } = useSelector(state => state.cart);
    const { isLogin } = useSelector(state => state.auth);
    const [org, setOrg] = React.useState(total);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(false);
    const history = useHistory();

    if (!isLogin) {
        history.push("/auth");
    }

    const handleContinue = () => {
        dispatch(emptyCart());
        history.push("/");
    };


    const handleFailure = () => {
        setOpen(false);
        setMsg(false);
    };

    React.useEffect(() => {
        dispatch(fetchCart())
    }, []);

    React.useEffect(() => {
        let t = 0;
        cart?.forEach(c => t += c.price);
        setOrg(t);
    }, [cart]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container maxWidth="lg">
            {
                isLoading ? (
                    <Box
                        sx={{
                            width: "100%",
                            minWidth: "20rem",
                            minHeight: "20rem",
                            m: "auto",
                            height: "100%",
                            display: "flex",
                            mt: 5,
                            justifyContent: "center"
                        }}
                    >
                        <CircularProgress sx={{ minHeight: "15rem", minWidth: "15rem" }} />
                    </Box>
                ) : (

                    <Box sx={{ display: "flex", py: 3 }}>
                        <Box sx={{ width: "60%", flexGrow: 1 }}>
                            <Typography variant="h3">
                                Checkout
                            </Typography>
                            <Typography variant="body1">
                                Billing Address
                            </Typography>
                            <Stack direction="row" sx={{ width: "80%" }} justifyContent="space-between">
                                <FormControl
                                    variant="filled"
                                    sx={{
                                        width: "45%",
                                        mt: 1,
                                        borderRadius: 0,
                                    }}
                                >
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                        labelId="country-label"
                                        id="country-label-select"
                                        value={"india"}
                                        onChange={handleChange}
                                        disabled
                                    >
                                        <MenuItem value={"india"}>India</MenuItem>
                                    </Select>

                                </FormControl>
                                <FormControl
                                    variant="filled"
                                    sx={{
                                        width: "45%",
                                        mt: 1,
                                        border: "1px solid black",
                                        borderRadius: 0,
                                    }}
                                >
                                    <TextField
                                        id="filled-select-state"
                                        select
                                        label="Select"
                                        name="state"
                                        value={state.state}
                                        onChange={handleChange}
                                        variant="filled"
                                    >
                                        {stateList.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Stack>
                            <FormControl sx={{ m: 1, mt: 4, width: "80%" }}>
                                <RadioGroup
                                    name="method"
                                    value={state.method}
                                    onChange={handleChange}
                                    sx={{ width: "100%" }}
                                >
                                    <FormControlLabel
                                        value="card"
                                        sx={{
                                            border: "1px solid #44444444",
                                            width: "100%",
                                            p: 1
                                        }}
                                        control={<Radio />}
                                        label="Credit/Debit Card"
                                    />
                                    <FormControlLabel
                                        value="upi"
                                        sx={{
                                            border: "1px solid #44444444",
                                            width: "100%",
                                            p: 1
                                        }}
                                        control={<Radio />}
                                        label="UPI"
                                    />
                                    <FormControlLabel
                                        disabled
                                        value="netnanking"
                                        sx={{
                                            border: "1px solid #44444444",
                                            width: "100%",
                                            p: 1
                                        }}
                                        control={<Radio />}
                                        label="Net Banking"
                                    />
                                    <FormControlLabel
                                        value="paytm"
                                        sx={{
                                            border: "1px solid #44444444",
                                            width: "100%",
                                            p: 1
                                        }}
                                        control={<Radio />}
                                        label="PayTM"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="wallet"
                                        sx={{
                                            border: "1px solid #44444444",
                                            width: "100%",
                                            p: 1
                                        }}
                                        control={<Radio />}
                                        label="Mobile Wallet"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <Box sx={{border: "0.25px solid #44444444", width: "77%", p: 2}}>    
                                <Typography variant="body2" color="text.secondary">
                                    In order to complete your transaction, we will transfer your request over to RazorPay
                                </Typography>
                            </Box>
                        </Box>
                        <Card sx={{
                            width: { md: "35%", sm: "50%" },
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            border: "0.5px solid #56567625",
                            borderRadius: 0,
                            height: "fit-content"
                        }}>
                            <Typography variant="h4">Summary</Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="body1" color="text.secondary">
                                    Original price:
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    &#8377;{addCommas(org)}
                                </Typography>
                            </Box>
                            {
                                org - total > 0 && (
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="body1" color="text.secondary">Coupon
                                            discounts:
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            -&#8377;{addCommas(org - total)}
                                        </Typography>
                                    </Box>
                                )
                            }
                            <Divider />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h5">
                                    Total:
                                </Typography>
                                <Typography variant="h5">
                                    &#8377;{addCommas(total)}
                                </Typography>
                            </Box>

                            <Typography variant="subtitle2">
                                Udemy is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
                            </Typography>


                            <Typography variant="caption">
                                By completing your purchase you agree to these Terms of Service.
                            </Typography>

                            <OutlinedBtn
                                onClick={() => displayRazorpay(setOpen, setMsg, state.method)}
                                sx={{
                                    bgcolor: "#A435E0",
                                    color: "white",
                                    borderColor: "#A435E0",
                                    height: "3.5rem",
                                    width: "100%",
                                    fontSize: "1.05rem",
                                    "&:hover": {
                                        bgcolor: "#A435F0"
                                    }
                                }} text="Complete Payment" />
                        </Card>
                    </Box>
                )
            }
            <Snackbar open={open}
                TransitionComponent={TransitionDown}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2000}
                onClose={msg ? handleFailure : handleContinue}
            >
                <Alert
                    severity="success" sx={{ width: '100%', minWidth: "30rem" }}>
                    {msg ? msg : "Order Placed Successfully!"};
                </Alert>
            </Snackbar>
        </Container >
    )
};

export default Checkout;