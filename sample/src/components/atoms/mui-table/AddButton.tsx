import React from "react";
import { Button } from "@mui/material";

const AddButton = ({ onClick }) => {
    return (
        <Button variant="contained" onClick={onClick} style={{ marginBottom: "10px" }}>
        Add Row
        </Button>
    );
};

export default AddButton;
