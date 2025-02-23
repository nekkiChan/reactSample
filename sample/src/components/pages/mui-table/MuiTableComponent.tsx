import React, { useState } from "react";
import { Button } from "@mui/material";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import SortableTable from "../../organisms/mui-table/SortableTable";

// データの型
interface Row {
    id: string;
    name: string;
    orderIndex: number;
    DeleteFlag: boolean;
}

// 初期データ
const initialData: Row[] = [
    { id: "1", name: "A", orderIndex: 1, DeleteFlag: false },
    { id: "2", name: "B", orderIndex: 2, DeleteFlag: false },
    { id: "3", name: "C", orderIndex: 3, DeleteFlag: true },
    { id: "4", name: "D", orderIndex: 4, DeleteFlag: false },
];

const SortableTablePage = () => {
    const [rows, setRows] = useState(initialData);
    const [isHidden, setIsHidden] = useState(false);

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

        updatedRows.forEach((row, index) => (row.orderIndex = index + 1));

        setRows(updatedRows);
        }
    };

    const handleDeleteToggle = (id: string) => {
        setRows((prevRows) =>
        prevRows.map((row) =>
            row.id === id ? { ...row, DeleteFlag: !row.DeleteFlag } : row
        )
        );
    };

    return (
        <div>
        <Button onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? "削除済み表示" : "削除済み非表示"}
        </Button>
        <SortableTable
            rows={rows}
            isHidden={isHidden}
            handleDragEnd={handleDragEnd}
            handleDeleteToggle={handleDeleteToggle}
        />
        </div>
    );
};

export default SortableTablePage;
