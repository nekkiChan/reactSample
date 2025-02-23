import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTableRow from "../../molecules/mui-table/SortableTableRow";

interface SortableTableProps {
  rows: { id: string; name: string; orderIndex: number; DeleteFlag: boolean }[];
  isHidden: boolean;
  handleDragEnd: (event: any) => void;
  handleDeleteToggle: (id: string) => void;
}

const SortableTable: React.FC<SortableTableProps> = ({
  rows,
  isHidden,
  handleDragEnd,
  handleDeleteToggle,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Index</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={rows.map((row) => row.id)}
            strategy={verticalListSortingStrategy}
          >
            <TableBody>
              {rows
                .filter((row) => !isHidden || !row.DeleteFlag)
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((row) => (
                  <SortableTableRow
                    key={row.id}
                    row={row}
                    onDeleteToggle={handleDeleteToggle}
                  />
                ))}
            </TableBody>
          </SortableContext>
        </DndContext>
      </Table>
    </TableContainer>
  );
};

export default SortableTable;
