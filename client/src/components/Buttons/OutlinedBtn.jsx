import Button from "@mui/material/Button";

const OutlinedBtn = ({ sx, text, onClick }) => {
    return (
        <Button
            variant="outlined"
            disableRipple
            onClick={onClick}
            sx={{
                color: "black",
                border: "1px solid #000",
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "0px",
                pt: 1,
                px: 2,
                height: "40px",
                minWidth: "100px",
                "&:hover": {
                    bgcolor: "#f3f3f3",
                    borderColor: "black",
                },
                ...sx
            }}
        >
            { text }
        </Button>
    )
};

export default OutlinedBtn;