import React from "react";
import { IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const DragHandle = (props) => {
    return (
        <IconButton {...props}>
        <DragIndicatorIcon />
        </IconButton>
    );
};

export default DragHandle;
