"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteTable } from "@/hooks/table/useDeleteTable";
import { Spinner } from "../ui/spinner";

export function DeleteTableDialog({ open, onOpenChange, onConfirm, table }) {
   const {loading , handleDeleteTable} = useDeleteTable(onOpenChange);
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Table</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete table &quot;{table?.name}&quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>handleDeleteTable(table._id)} className="bg-red-500 hover:bg-red-600">
            {loading? <Spinner/> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}