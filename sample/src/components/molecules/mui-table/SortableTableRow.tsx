import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandleButton from "../../atoms/mui-table/DragHandleButton";
import DeleteButton from "../../atoms/mui-table/DeleteButton";

interface SortableTableRowProps {
  row: { id: string; name: string; orderIndex: number; DeleteFlag: boolean };
  onDeleteToggle: (id: string) => void;
}

const SortableTableRow: React.FC<SortableTableRowProps> = ({
  row,
  onDeleteToggle,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell>
        <DragHandleButton listeners={listeners} />
      </TableCell>
      <TableCell>{row.orderIndex}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        <DeleteButton
          isDeleted={row.DeleteFlag}
          onClick={() => onDeleteToggle(row.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default SortableTableRow;
