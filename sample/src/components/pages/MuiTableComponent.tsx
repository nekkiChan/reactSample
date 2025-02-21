import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

// データの型
interface Row {
    id: string;
    name: string;
    orderIndex: number;
    DeleteFlag: boolean;
}

const initialData: Row[] = [
    { id: "1", name: "A", orderIndex: 1, DeleteFlag: false },
    { id: "2", name: "B", orderIndex: 2, DeleteFlag: false },
    { id: "3", name: "C", orderIndex: 3, DeleteFlag: true }, // 削除済み（非表示）
    { id: "4", name: "D", orderIndex: 4, DeleteFlag: false },
];

const SortableRow = ({ row }: { row: Row }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: row.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TableCell>{row.orderIndex}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>
            <Button
            variant="outlined"
            color={row.DeleteFlag ? "secondary" : "primary"}
            onClick={() => console.log("削除ボタン押下")}
            >
            {row.DeleteFlag ? "復元" : "削除"}
            </Button>
        </TableCell>
        </TableRow>
    );
};

const SortableTable = () => {
    const [rows, setRows] = useState(initialData);
    const [isHidden, setIsHidden] = useState(false);

    // ドラッグ＆ドロップ用センサー設定
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const oldIndex = rows.findIndex((row) => row.id === active.id);
        const newIndex = rows.findIndex((row) => row.id === over.id);

        if (oldIndex !== newIndex) {
        const updatedRows = [...rows];
        const [movedRow] = updatedRows.splice(oldIndex, 1);
        updatedRows.splice(newIndex, 0, movedRow);

        // orderIndex を更新
        updatedRows.forEach((row, index) => (row.orderIndex = index + 1));

        setRows(updatedRows);
        }
    };

    return (
        <TableContainer component={Paper}>
        <Button onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? "削除済み表示" : "削除済み非表示"}
        </Button>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
                <TableBody>
                {rows
                    .filter((row) => !isHidden || !row.DeleteFlag)
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((row) => (
                    <SortableRow key={row.id} row={row} />
                    ))}
                </TableBody>
            </SortableContext>
            </DndContext>
        </Table>
        </TableContainer>
    );
};

export default SortableTable;
