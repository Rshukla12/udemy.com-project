import React,{ useState} from 'react';
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom'
import Form from '../Form/Form';

const ContainedBtn = ({ text, onClick, sx,component, to}) => {
    const [currentId, setCurrentId] = useState(0);
    return (
        <Button
            variant="contained"
            component={component}
            to={to}
            disableRipple
            sx={{
                bgColor: "black",
                color: "white",
                backgroundColor: "black",
                border: "1px solid #000",
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "0px",
                pt: 1,
                px: 2,
                height: "40px",
                minWidth: "100px",
                "&:hover": {
                    bgcolor: "black",
                    borderColor: "black",
                    color: "white"
                },
                ...sx
            }}
        >
           {text}
        </Button>
    )
};

export default ContainedBtn;