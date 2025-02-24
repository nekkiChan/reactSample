import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";

const DeleteButton = ({ onClick, deleteFlag }) => {
    return (
        <IconButton onClick={onClick}>
            {deleteFlag ? <RestoreIcon /> : <DeleteIcon />}
        </IconButton>
    );
};

export default DeleteButton;
