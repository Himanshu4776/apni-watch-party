import React, { useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface AddRoomModalProps {
    addRoomModal: boolean
    setAddRoomModal: (val: boolean) => void;
}

export function AddRoom({addRoomModal, setAddRoomModal}:AddRoomModalProps) {
    const roomDataRef = useRef({ title: "", userId: -1 });

    function handleAddRoom(e: React.FormEvent) {
        e.preventDefault();
        const username = localStorage.getItem('username')?.replace(/"/g, '');
    
        axios.post(`http://localhost:8080/room/make/${username}`, {
            title: roomDataRef.current.title
        })
        .then(response => {
            console.log('Room created:', response.data);
            setAddRoomModal(false);
        })
        .catch(error => {
            console.error('Error creating room:', error);
        });
    }
    return (
        <div className=" bg-gray-100">
        <Dialog open={addRoomModal} onOpenChange={setAddRoomModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Add Room
              </DialogTitle>
              <DialogDescription>
              Create a new Room for your friends!!!
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
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
    );
}
