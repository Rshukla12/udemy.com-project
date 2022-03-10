import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import OutlinedBtn from '../../components/Buttons/OutlinedBtn';
import { displayRazorpay } from '../../components/Razorpay/payment';
import { emptyCart, fetchCart } from '../../redux/actions/cart';
import { CircularProgress } from '@mui/material';
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar"; 
import { useHistory } from "react-router-dom";

export function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

const addCommas = (num) => {
    return Number(num.toFixed(2)).toLocaleString('en');
}

const CustomTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const initState = {
    name: "",
    card: "",

}

const Checkout = () => {
    const [state, setState] = React.useState('');
    const { cart, total, isLoading } = useSelector(state => state.cart);
    const { isLogin } = useSelector(state=>state.auth);
    const [org, setOrg] = React.useState(total);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(false);
    const history = useHistory();

    console.log(1)

    if ( !isLogin ){
        history.push("/auth");
    }
    const handleContinue = () => {
        console.log("a")
        dispatch( emptyCart() );
        history.push("/");
    };

    
    const handleFailure = () => {
        setOpen(false), 
        setMsg(false)
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
            [e.target.name]: e.taget.value
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
                        <CircularProgress sx={{minHeight: "15rem", minWidth: "15rem" }}/>
                    </Box>
                ) : (

                    <Box sx={{display: "flex", py: 3}}>
                        <Box sx={{ width: "60%", flexGrow: 1 }}>
                            <Typography variant="h3">
                                Checkout
                            </Typography>
                            <Typography variant="body1">
                                Billing Address
                            </Typography>
                            <FormControl
                                variant="filled"
                                sx={{
                                    maxWidth: "40%",
                                    m: 1,
                                    minWidth: 120,
                                    border: "0.5px solid #67676767"
                                }}
                            >
                                <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={state.age}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"India"}>India</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Card sx={{ 
                            width: { md: "35%", sm: "50%"}, 
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            border: "0.5px solid #56567625",
                            borderRadius: 0
                        }}>
                            <Typography variant="h4">Summary</Typography>
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography variant="body1" color="text.secondary">
                                    Original price:
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    &#8377;{addCommas(org)}
                                </Typography>
                            </Box>
                            {
                                org - total > 0 && (
                                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
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
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
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
                                onClick={()=>displayRazorpay(setOpen, setMsg)}
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
                anchorOrigin={{ vertical: 'top', horizontal: 'center'} } 
                autoHideDuration={2000} 
                onClose={msg ? handleFailure : handleContinue }
            >
                <Alert 
                 severity="success" sx={{ width: '100%', minWidth: "30rem" }}>
                    {msg ? msg: "Order Placed Successfully!" };
                </Alert>
            </Snackbar>
        </Container>
    )
};

export default Checkout;