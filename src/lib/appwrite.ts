import { Account, Client, Databases, ID } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)  //non-null assertion operator (!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); //ew can use- ?? nullish coalescing
export const account = new Account(client);
export const database = new Databases(client);
export {ID}
