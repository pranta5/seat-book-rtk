import { Room, Seat } from "@/types/rooms";
import { database, ID } from "../appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID;
const ROOM_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ROOMCOLLECTION_ID;
if (!DB_ID) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_APPWRITE_DB_ID");
}

if (!ROOM_COLLECTION_ID) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_APPWRITE_ROOM_COLLECTION_ID");
}

export const createRoom = async (name: string, layout: Seat[][]):Promise<Room> => {
  const res = await database.createDocument(
    DB_ID,
    ROOM_COLLECTION_ID,
    ID.unique(),
    {
      name,
      layout: JSON.stringify(layout),
    }
  );
  return{
    $id:res.$id,
    name : res.name || 'unnamed',
    layout:JSON.parse(res.layout || '[]') 
  };
};

export const getRooms = async ():Promise<Room[]> => {
  const res = await database.listDocuments(DB_ID, ROOM_COLLECTION_ID);
  return res.documents.map((doc) => ({
    $id : doc.$id,
    name :doc.name || "unnamed room",
    layout: JSON.parse(doc.layout),
  }));
};
export const deleteRoom = async (roomId: string) => {
  await database.deleteDocument(DB_ID, ROOM_COLLECTION_ID, roomId);
};

export const getRoomById = async (roomId: string) => {
  const doc = await database.getDocument(DB_ID, ROOM_COLLECTION_ID, roomId);
  return {
    ...doc,
    layout: JSON.parse(doc.layout),
    name: doc.name,
  };
};


// export const updateRoom = async (roomId: string, updates: { name: string }) => {
//   const res = await database.updateDocument(
//     DB_ID,
//     ROOM_COLLECTION_ID,
//     roomId,
//     updates
//   );
//   return res;
// };


export const updateRoomLayout = async (roomId: string, layout: Seat[][]) => {
  return database.updateDocument(DB_ID, ROOM_COLLECTION_ID, roomId, {
    layout: JSON.stringify(layout),
  });
};
;
