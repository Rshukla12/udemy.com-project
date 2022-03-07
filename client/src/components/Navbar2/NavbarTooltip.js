import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)', 
        marginTop: 100,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const NavbarToolTip = ({ right, component, children }) => {
    return (
        <div style={{paddingTop: 10, marginTop: 3}}>
            <HtmlTooltip
                placement={right ? "bottom-start" : "bottom-end" }
                title={
                    <React.Fragment>
                         { component }
                    </React.Fragment>
                }
            >
                { children }
            </HtmlTooltip >
        </div >
    );
};

export default NavbarToolTip;
