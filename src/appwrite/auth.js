/* eslint-disable no-useless-catch */
import { Client, Account, ID } from 'appwrite';
import conf from "../conf/conf"; // Configuration file for Appwrite project

export class AuthService {
    client = new Client();
    account;

    constructor() {
        // Initialize Appwrite client
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite API URL
            .setProject(conf.appwriteProjectId); // Your Appwrite project ID
        
        this.account = new Account(this.client); // Initialize Appwrite Account service
    }

    // Create a new account for the user
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password }); // Automatically login after account creation
            }
            return userAccount;
        } catch (error) {
            throw error; // Catch and throw errors for debugging
        }
    }

    // Login the user
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw error; // Catch and throw errors for debugging
        }
    }

    // Get the currently logged-in user's details
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error; // Catch and throw errors for debugging
        }
    }

    // Logout the currently logged-in user
    async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
