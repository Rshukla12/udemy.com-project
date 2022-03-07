import * as React from 'react';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import NavbarToolTip from './NavbarTooltip';


const menus = [
  {
    "Field": "Development",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Business",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Finance & Accounting",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "IT & Software",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Office Productivity",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Personal Development",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Design",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "LifeStyle",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Marketing",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Photography",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Health",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Music",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  },
  {
    "Field": "Teaching",
    "Data": ["Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming", "Web Development", "Data Science", "Mobile Development", "Mobile Devices", "Programming"]
  }
];

const MenuComponent = () => (
  <MenuList sx={{px: 3, py:2}}>
    {
      menus.map(menu => (
        <MenuList sx={{ fontSize: "1.1rem" }} key={menu.Field} >
          {menu.Field}
        </MenuList>
      ))
    }
  </MenuList>
);

const PopMenu = ({ text = "Categories", children }) => {

  return (
    <>
      <NavbarToolTip component={text==="Categories" ? <MenuComponent /> : children } right={text==="Categories" ? true : false } >
        <Button
          sx={{
            color: "black",
            borderRadius: "0px",
            textTransform: "none",
            fontSize: "0.9rem",
            minWidth: "140px",
            display: "flex",
            "&:hover": {
              color: "slateblue",
              bgcolor: "white"
            },
          }}
        >
          {text}
        </Button>
      </NavbarToolTip>
    </>
  );
};

export default PopMenu;