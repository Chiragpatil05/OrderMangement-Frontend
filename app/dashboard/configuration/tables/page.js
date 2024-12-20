"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TableCard from "@/components/tables/TableCard";
import { AddTableDialog } from "@/components/tables/AddTableDialog";
import { EditTableDialog } from "@/components/tables/EditTableDialog";
import { DeleteTableDialog } from "@/components/tables/DeleteTableDialog";

export default function ManageTablesPage() {
  const [tables, setTables] = useState([
    { 
      id: 1, 
      name: "Table 1", 
      capacity: 4, 
      location: "main-hall",
      status: "free" 
    },
    { 
      id: 2, 
      name: "Table 2", 
      capacity: 6, 
      location: "main-hall",
      status: "occupied" 
    },
    { 
      id: 3, 
      name: "Table 3", 
      capacity: 2, 
      location: "outdoor",
      status: "free" 
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleAddTable = (newTable) => {
    setTables([...tables, { id: Date.now(), ...newTable }]);
    setIsAddDialogOpen(false);
  };

  const handleEditTable = (updatedTable) => {
    setTables(tables.map((table) => 
      table.id === updatedTable.id ? updatedTable : table
    ));
    setIsEditDialogOpen(false);
    setSelectedTable(null);
  };

  const handleDeleteTable = () => {
    setTables(tables.filter((table) => table.id !== selectedTable.id));
    setIsDeleteDialogOpen(false);
    setSelectedTable(null);
  };

  const handleStatusChange = (tableId, newStatus) => {
    setTables(tables.map((table) =>
      table.id === tableId ? { ...table, status: newStatus } : table
    ));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Table Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage restaurant tables and their status
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2 w-full sm:w-auto shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Table
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onStatusChange={handleStatusChange}
            onEdit={() => {
              setSelectedTable(table);
              setIsEditDialogOpen(true);
            }}
            onDelete={() => {
              setSelectedTable(table);
              setIsDeleteDialogOpen(true);
            }}
          />
        ))}
      </div>

      <AddTableDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddTable}
      />

      <EditTableDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        table={selectedTable}
        onEdit={handleEditTable}
      />

      <DeleteTableDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        table={selectedTable}
        onConfirm={handleDeleteTable}
      />
    </div>
  );
}