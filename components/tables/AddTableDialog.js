"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateTable } from "@/hooks/table/useCreateTable";
import { Spinner } from "../ui/spinner";
// import QRCode from "qrcode";

export function AddTableDialog({ open, onOpenChange }) {
  const [sequence, setSequence] = useState(0);
  const [capacity, setCapacity] = useState("");
  const [position, setPosition] = useState("");

  const handleClose = ()=>{
    setSequence("");
    setCapacity("");
    setPosition("");
    onOpenChange(false)
  }

  const {loading : createTableLoading, handleCreateTable} = useCreateTable(handleClose); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const tableData = {
      sequence,
      capacity: parseInt(capacity),
      position,
    };

    console.log("table data -------", tableData)
    
    handleCreateTable(tableData);
    
  };

 

  const downloadQR = async () => {
    if (!sequence || !capacity) {
      alert("Please fill in table details first");
      return;
    }

    const qrCodeUrl = await generateQR({
      sequence,
      capacity: parseInt(capacity),
      position,
    });

    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `table-${sequence}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={open} onOpenChange={()=>handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Table</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sequence">Table Number</Label>
            <Input
              id="sequence"
              type="number"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              placeholder="Enter table sequence"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter table capacity"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sequence">Position</Label>
            <Input
              id="sequence"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter table position"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button type="submit">{createTableLoading ? <Spinner/> : "Add Table"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}