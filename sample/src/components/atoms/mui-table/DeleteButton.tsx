import React from "react";
import { Button } from "@mui/material";

interface DeleteButtonProps {
    isDeleted: boolean;
    onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ isDeleted, onClick }) => {
    return (
        <Button variant="outlined" color={isDeleted ? "secondary" : "primary"} onClick={onClick}>
        {isDeleted ? "復元" : "削除"}
        </Button>
    );
};

export default DeleteButton;
