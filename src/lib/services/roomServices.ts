import { Seat } from "@/types/rooms";
import { database, ID } from "../appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const ROOM_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ROOMCOLLECTION_ID!;

export const createRoom = async (name: string, layout: Seat[][]) => {
  const res = await database.createDocument(
    DB_ID,
    ROOM_COLLECTION_ID,
    ID.unique(),
    {
      name,
      layout: JSON.stringify(layout),
    }
  );
  return res;
};

export const getRooms = async () => {
  const res = await database.listDocuments(DB_ID, ROOM_COLLECTION_ID);
  return res.documents.map((doc) => ({
    ...doc,
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
