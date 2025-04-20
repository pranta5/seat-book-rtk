import { database, ID } from "../appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const USER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERCOLLECTION_ID!;

export const createUser = async (
  name: string,
  email: string,
  position: string
) => {
  return await database.createDocument(DB_ID, USER_COLLECTION_ID, ID.unique(), {
    name,
    email,
    position,
  });
};
export const getUsers = async()=>{
    const res = await database.listDocuments(DB_ID,USER_COLLECTION_ID)
    return res.documents
}

export const deleteUser = async(userId:string)=>{
    await database.deleteDocument(DB_ID,USER_COLLECTION_ID,userId)
}