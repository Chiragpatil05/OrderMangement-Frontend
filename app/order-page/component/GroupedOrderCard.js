import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MyKanbanOrderCard } from './MyKanbanOrderCard';
import { Utensils, User, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

export function GroupedOrderCard({ orders, tableSequence, customerName, totalAmount, billId }) {
  const router = useRouter();
  const orderCount = orders.length;

  const handleBillClick = () => {
    if (billId) {
      router.push(`/bill/${billId}`);
    } else {
      router.push(`/bill/table/${orders[0].tableId._id.toString()}`);
    }
  };

  return (
    <Card className="w-full max-w-sm mb-4 p-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex justify-between items-center">
          <span>Table {tableSequence}</span>
          <span className="text-sm font-normal">{orderCount} orders</span>
        </CardTitle>
        <div className="flex justify-between items-center text-sm mt-2">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{customerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-gray-600">
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <Button 
              variant={billId ? "outline" : "destructive"} 
              onClick={handleBillClick}
              className="px-2"
            >
              {billId ? "View Bill" : "Generate Bill"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 px-2 space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
        {orders.map((order) => (
          <MyKanbanOrderCard key={order._id} order={order} />
        ))}
      </CardContent>
    </Card>
  );
}
