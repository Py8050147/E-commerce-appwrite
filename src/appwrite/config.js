/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import conf from "../conf/conf";
import {
    Client,
    ID,
    Databases,
    Storage,
    Query,
} from "appwrite";
import authService from "./auth";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        console.log(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_PRODUCT_ID
        );
        this.client
            .setEndpoint(conf.appwriteUrl) // API Endpoint
            .setProject(conf.appwriteProjectId); // Project ID

        this.databases = new Databases(this.client); // Initialize databases
        this.bucket = new Storage(this.client); // Initialize storage (bucket)
    }

    // Method to create a product document in the database
    async createPost({
        title,
        description,
        price,
        slug,
        stock,
        productImg,
        status,
        userId
    }) {
          try {
              return await this.databases.createDocument(
                  conf.appwritedatabaseId,
                  conf.appwriteproductId,
                  slug,
                  {
                    title,
                    description,
                    price,
                    stock,
                    productImg,
                    status,
                    userId
                  }
            )
          } catch (error) {
            console.log(error)
          }
    }

    // Update a post/document
    async updatePost(
        slug,
        { title, description, productImg, status, price, stock }
    ) {
        try {
            return await this.databases.updateDocument(
                // import.meta.env.VITE_APPWRITE_DATABASE_ID,
                conf.appwritedatabaseId,
                // import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_PRODUCT_ID,
                conf.appwriteproductId,
                slug,
                {
                    title,
                    description,
                    productImg,
                    status,
                    price,
                    stock,
                }
            );
        } catch (error) {
            console.error("Appwrite Service :: updatePost :: error", error);
            throw error;
        }
    }

    // Get a specific post/document by slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseId,
                conf.appwriteproductId,
                slug
            );
        } catch (error) {
            console.error("Appwrite Service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseId,
                conf.appwriteproductId,
                queries
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
        }
        return false
    }

    // Upload a file to the storage bucket
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwritebuccketId, // Bucket ID
                ID.unique(), // Unique ID for the file
                file // File to upload
            );
        } catch (error) {
            console.error("Appwrite Service :: uploadFile :: error", error);
            return false;
        }
    }

    // Delete a file from the storage bucket
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwritebuccketId, // Bucket ID
                fileId // ID of the file to delete
            );
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deleteFile :: error", error);
            return false;
        }
    }

    // Get file preview method
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            // import.meta.env.VITE_APPWRITE_BUCCKET_ID
            conf.appwritebuccketId, // Bucket ID
            fileId // ID of the file to preview
        );
    }
}

const service = new Service();
export default service;
