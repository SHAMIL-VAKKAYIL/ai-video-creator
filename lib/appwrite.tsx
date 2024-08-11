import { router } from 'expo-router';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
export const Config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aoraa',
    projectId: '66b5f8ad0015f06a3a83',
    databaseId: '66b5fc78003a53a1d862',
    userCollectionId: '66b5fc9f001046780a57',
    videoCollectionId: '66b5fcc60001b1b13a35',
    storageId: '66b6d8ee00021d591ea4'
}

// Init  React Native SDK
const client = new Client();

client
    .setEndpoint(Config.endpoint) //  Appwrite Endpoint
    .setProject(Config.projectId) //  project ID
    .setPlatform(Config.platform) //  application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client)

export const createUser = async (email, password, username) => {
    // Register User
    try {
        // Check for an active session and log out if one exists
        const sessions = await account.listSessions();
        if (sessions.total > 0) {
            await account.deleteSession('current');
        }
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw new Error

        const avatarUrl = avatars.getInitials(username)

        // await SignIn(email, password)

        const newUser = await database.createDocument(
            Config.databaseId,
            Config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username,
                email,
                avatar: avatarUrl
            }
        )
        return newUser

    } catch (err) {
        console.log(err);
        throw new Error(err)
    }

}
export const SignIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session

    } catch (error) {
        console.log(error);
        throw new Error(error)

    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw new Error

        const currentUser = await database.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw new Error

        return currentUser.documents[0]

    } catch (error) {
        throw new Error(error)
    }
}
export const getAllposts = async () => {
    try {
         const posts=await database.listDocuments(
            Config.databaseId,
            Config.videoCollectionId,
           
         )
         return posts.documents
    } catch (error) {
        
        throw new Error(error)
    }
}