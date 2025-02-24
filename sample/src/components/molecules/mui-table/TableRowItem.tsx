import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandle from "../../atoms/mui-table/DragHandle";
import DeleteButton from "../../atoms/mui-table/DeleteButton";

const TableRowItem = ({ row, handleDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: row.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
        <TableCell {...attributes} {...listeners}>
            <DragHandle />
        </TableCell>
        <TableCell>{row.orderIndex} </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>
                <DeleteButton onClick={() => handleDelete(row.id)} deleteFlag={row.deleteFlag} />
        </TableCell>
        </TableRow>
    );
};

export default TableRowItem;
