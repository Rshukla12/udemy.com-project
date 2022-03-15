import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import LanguageIcon from "@mui/icons-material/Language";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchBar from "./SearchBar";
import PopMenu from "./PopMenu";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedBtn from "../Buttons/OutlinedBtn";
import ContainedBtn from "../Buttons/ContainedBtn";
import { Avatar, Button } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../../redux/constants/actionTypes";
import useStyles from "./styles";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderRoundedIcon from "@mui//icons-material/FavoriteBorderRounded";
import { emptyCart, fetchCart } from "../../redux/actions/cart";
import { emptyWishlist, fetchWishlist } from "../../redux/actions/wishlist";
import { emptyPurchased, fetchPurchased } from "../../redux/actions/purchase";
// import InstructorDashboard from "../InstructorDashBoard/InstructorDashboard";
const pages = [
  {
    text: "Udemy Business",
    body: "Get your team access to over 6,000 top Udemy courses, anytime, anywhere.",
    btn: "Try Udemy Business",
  },
  {
    text: "Teach on Udemy",
    body: "Turn what you know into an opportunity and reach millions around the world.",
    btn: "Learn More",
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const { isLogin } = useSelector(state=>state.auth);
  const { cart } = useSelector(state=>state.cart);
  const { wishlist } = useSelector(state=>state.wishlist);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    dispatch(emptyCart());
    dispatch(emptyWishlist());
    dispatch(emptyPurchased());
    dispatch({ type: actionType.EMPTY_REVIEWS });
    setUser(null);
    history.push("/auth");
  };

  const [btn,setBtn] = useState(false)

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
    dispatch(fetchPurchased());
  }, [isLogin]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="absolute"
      sx={{ 
        bgcolor: "white", 
        color: "black", 
        py: 0.5,
        zIndex: 501
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack sx={{ width: "100%", px: 1 }} spacing={1.25} direction="row">
            <Box 
              onClick={()=>history.push("/")} 
              sx={{ 
                display: { xs: "none", md: "flex" },
                maxWidth: "6rem",
                cursor: "pointer" 
              }}
            >
              <img
                style={{ width: "100%", minWidth: "4rem" }}
                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                alt="logo"
              />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                color: "black",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                width: "70%",
                justifyContent: "center",
                cursor: "pointer"
              }}
              onClick={()=>history.push("/")}
            >
              <img
                style={{ width: "100%", width: "5rem" }}
                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                alt="logo"
              />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <PopMenu/>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, width: "48%" }}>
              <SearchBar />
            </Box>

{
  user?.result? (<Box sx={{pt:2}}><Link style={{textDecoration: "none",color: "black"}} to='/instructor/course'>Instructor</Link></Box>):
  (<Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
  {pages.map((page) => (
    <PopMenu key={page.text} text={page.text}>
      <Container
        sx={{
          pb: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            py: 1,
          }}
        >
          {page.body}
        </Typography>
        <ContainedBtn  component={Link}
         to="/instructor"
        text={page.btn}
          // {{page.btn} ==='Learn More' ? {page.btn} component={Link} to={'/auth'} : {page.btn}}
          sx={{
            px: 3,
            py: 2.5,
            height: "30px",
            minWidth: "stretch",
          }}
        />
      </Container>
    </PopMenu>
  ))}
</Box>)
}
          
          




            <Stack direction="row" spacing={2}>
              <IconButton
                disableRipple
                sx={{
                  color: "black",
                  borderRadius: "0px",
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                  "&:hover": {
                    color: "slateblue",
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                component={Link}
                to="/cart"
                disableRipple
                sx={{
                  color: "black",
                  borderRadius: "0px",
                  "&:hover": {
                    color: "slateblue",
                  },
                }}
              >
                <Badge badgeContent={cart.length ?? 0} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ pt: 1.5, display: { xs: "none", md: "flex" } }}
            >
              {user?.result ? (
                <>
                  <IconButton
                    component={Link}
                    to="/wishlist"
                    disableRipple
                    sx={{
                      color: "black",
                      borderRadius: "0px",
                      "&:hover": {
                        color: "slateblue",
                      },
                    }}
                  >
                    <Badge sx={{mb: 1.5, height: "1.5rem"}} badgeContent={wishlist.length ?? 0} color="secondary">
                      <FavoriteBorderRoundedIcon/>
                    </Badge>
                  </IconButton>
                  <Tooltip title={user?.result?.user?.name} placement="bottom">
                    <Avatar
                      className={classes.purple}
                      sx={{
                        bgcolor: "slateblue",
                        cursor: "pointer"
                      }}
                      alt={user?.result.name}
                      src={user?.result.imageUrl}
                      onClick={()=>history.push("/purchased")}
                    >
                      {user?.result?.user?.name.charAt(0)}
                    </Avatar>
                  </Tooltip>
                  <Button
                    variant="contained"
                    className={classes.logout}
                    color="secondary"
                    onClick={logout}
                    sx={{height: "40px", bgcolor: "slateblue"}}
                  >
                    Logout
                  </Button>
                  </>
              ) : (
                <>
                  <OutlinedBtn text="Sign in" component={Link} to="/auth" />
                  <ContainedBtn text="Sign up" component={Link} to="/auth"/>
                </>
              )}
              <IconButton
                variant="outlined"
                sx={{
                  color: "black",
                  borderRadius: "0px",
                  height: "40px",
                  border: "1px solid #444",
                }}
              >
                <LanguageIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
