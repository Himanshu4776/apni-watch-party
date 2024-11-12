import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { AddRoom } from "./add-room";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Trash } from "lucide-react";

export interface Room {
  id: string;
  title: string;
  videos: Video[];
  users: User[];
  members: string;
}

export interface Video {
  id: string;
}

export interface User {
  id: string;
  username: string;
}

export function Room() {
  const [rooms, setRooms] = useState([]);
  const [addRoomModal, setAddRoomModal] = useState(false);

  async function handleGenerateJoinLink(roomId: string) {
    try {
      const response = await axios.get(`http://localhost:8080/room/generate/${roomId}`)
      const joinLink = response.data
      await navigator.clipboard.writeText(joinLink)
    } catch (error) {
      console.error('Error generating join link:', error)
    }
  }

  function handleRemoveRoom() {
    // noop
  }

  const fetchRooms = async () => {
    try {
      const username = localStorage.getItem('username')?.replace(/"/g, '');
      const response = await axios.get(`http://localhost:8080/room/${username}`);

      const roomsWithMembers = response.data.map((room: Room) => ({
        ...room,
        members: room?.users?.map(user => user?.username).join(', ')
      }));
      setRooms(roomsWithMembers);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };
  
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="py-4 px-16">
      <div className="flex justify-between">
        <h1 className="text-3xl text-blue-600 font-bold">Rooms</h1>
        <Button variant="outline" onClick={() => {setAddRoomModal(true);}}>
          Add Room
        </Button>
      </div>
      {addRoomModal && (
        <AddRoom
          addRoomModal={addRoomModal}
          setAddRoomModal={setAddRoomModal}
        />
      )}
      <div className="">
        <Table>
          <TableCaption>A list of all recent rooms created.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >Room Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead className="text-right">Action</TableHead>
              <TableHead className="text-right">Invite Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms && rooms.map((room: Room) => (
              <TableRow key={`${room.id}`}>
                <TableCell className="font-medium">{`${room.title}`}</TableCell>
                <TableCell>{`${room.members}`}</TableCell>
                <TableCell className="text-right">
                <Button variant="destructive" onClick={handleRemoveRoom}>
                  <Trash /> Delete
                </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" className="px-3" variant="outline" onClick={() => handleGenerateJoinLink(`${room.id}`)}>
                    <span className="sr-only">Copy</span>
                    <Copy />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
