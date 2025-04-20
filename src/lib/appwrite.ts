import { Account, Client, Databases, ID } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint) {
  throw new Error("Missing NEXT_PUBLIC_APPWRITE_ENDPOINT in environment variables.");
}

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_APPWRITE_PROJECT_ID in environment variables.");
}

export const client = new Client()
  .setEndpoint(endpoint) 
  .setProject(projectId);

export const account = new Account(client);
export const database = new Databases(client);
export { ID };
