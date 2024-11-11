import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { title } from "process";

export function Room() {
  const [rooms, setRooms] = useState([]);
  const [addRoomModal, setAddRoomModal] = useState(false);
  const roomDataRef = useRef({ title: "", userId: -1 });

  function handleRoomCreate() {
    setAddRoomModal(true);
  }

  return (
    <div className="py-4 px-16">
      <div className="flex justify-between">
        <h1 className="text-3xl text-blue-600 font-bold">Rooms</h1>
        <Button variant="outline" onClick={handleRoomCreate}>
          Add Room
        </Button>
      </div>
      <div className="min-h-screen min-w-max flex flex-col bg-gray-100">
        <Dialog open={addRoomModal} onOpenChange={setAddRoomModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Create a new Room for your friends!!!
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={() => {}} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter room name"
                  onChange={(e) => (roomDataRef.current.title = e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
