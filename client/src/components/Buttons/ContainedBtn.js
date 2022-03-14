import Button from "@mui/material/Button";

const ContainedBtn = ({ text, onClick, sx, ...props }) => {
    return (
        <Button
            variant="contained"
            disableRipple
            {...props}
            onClick={()=>onClick()}
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