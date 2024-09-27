const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteproductId: String(import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_PRODUCT_ID),
    appwritebuccketId: String(import.meta.env.VITE_APPWRITE_BUCCKET_ID),
}

export default conf