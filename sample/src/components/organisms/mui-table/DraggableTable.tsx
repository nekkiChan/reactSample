import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import TableRowItem from "../../molecules/mui-table/TableRowItem";
import AddButton from "../../atoms/mui-table/AddButton";
import { v4 as uuidv4 } from "uuid";

// 📌 行データの型
type Row = {
    id: number | string; // 既存アイテムは数値、新規追加はUUID
    name: string;
    orderIndex: number;
    deleteFlag: boolean;
};

const DraggableTable = () => {
    // 📌 初期データ（id は 1, 2, 3）
    const [rows, setRows] = useState<Row[]>([
        { id: 1, name: "Item 1", orderIndex: 1, deleteFlag: false },
        { id: 2, name: "Item 2", orderIndex: 2, deleteFlag: false },
        { id: 3, name: "Item 3", orderIndex: 3, deleteFlag: false },
    ]);

    const [showDeleted, setShowDeleted] = useState(false);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = rows.findIndex((row) => row.id === active.id);
        const newIndex = rows.findIndex((row) => row.id === over.id);

        const newRows = arrayMove(rows, oldIndex, newIndex).map((row, index) => ({
        ...row,
        orderIndex: index + 1,
        }));

        setRows(newRows);
    };

    const addRow = () => {
        setRows([
        ...rows,
        {
            id: uuidv4(), // 新規追加は UUID
            name: `New Item ${rows.length + 1}`,
            orderIndex: rows.length + 1,
            deleteFlag: false,
        },
        ]);
    };

    const handleDelete = (id: number | string) => {
        setRows(
        rows.map((row) =>
            row.id === id ? { ...row, deleteFlag: !row.deleteFlag } : row
        )
        );
    };

    useEffect(() => {
        console.log(rows);
    }, [rows]);

    return (
        <div>
        <AddButton onClick={addRow} />
        <Button
            variant="outlined"
            onClick={() => setShowDeleted(!showDeleted)}
            style={{ marginBottom: "10px", marginLeft: "10px" }}
        >
            {showDeleted ? "Show All" : "Hide Deleted"}
        </Button>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={rows.map((row) => row.id)}>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Move</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .filter((row) => (showDeleted ? true : !row.deleteFlag))
                    .map((row) => (
                        <TableRowItem
                        key={row.id}
                        row={row}
                        handleDelete={handleDelete}
                        />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </SortableContext>
        </DndContext>
        </div>
    );
};

export default DraggableTable;
