import React from "react";
import { IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface DragHandleButtonProps {
    listeners: any;
}

const DragHandleButton: React.FC<DragHandleButtonProps> = ({ listeners }) => {
    return (
        <IconButton {...listeners}>
        <DragIndicatorIcon />
        </IconButton>
    );
};

export default DragHandleButton;
