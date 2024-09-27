/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            description: post?.content || "",
            productImg: post?.productImg || "",
            price: post?.price || "",
            stock: post?.stock || "",
            status: post?.status || "active",
        },
    });

    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData.$id)

    const submit = async (data) => {
        data.price = parseInt(data.price, 10); 
        data.stock = parseInt(data + 1, 10)
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.productImg);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.productImg = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                 console.log(dbPost)
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="container max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
             <div className="grid grid-cols-1 gap-6">
                 <h1 className="text-3xl font-bold text-center text-gray-700">
                     {post ? "Edit Post" : "Create New Post"}
                 </h1>

                 <form onSubmit={handleSubmit(submit)}>
                     {/* File Input */}
                     <div className="flex flex-col">
                         <label className="text-gray-600 mb-2">Upload File</label>
                         <input
                            type="file"
                             name="image"
                             className="border border-gray-300 p-2 rounded-lg"
                             accept="image/png, image/jpg, image/jpeg"
                             {...register("image", { required: !post })}
                         />
                    </div>
                   {post && post.productImg && (
                        <div className="w-full mb-4">
                            <img
                               src={appwriteService.getFilePreview(post.productImg)}
                               alt={post.title}
                                 className="rounded-lg"
                             />
                         </div>
                     )}

                     {/* Product Name */}
                     <div className="flex flex-col">
                         <label className="text-gray-600 mb-2">Product Name</label>
                         <input
                             type="text"
                            name="title"
                            placeholder="Please write product name..."
                            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                             {...register("title", { required: true })}
                         />
                     </div>

                     <div className="flex flex-col">
                         <label className="text-gray-600 mb-2">stock</label>
                        <input
                             type="number"
                             name="stock"
                            placeholder="stock"
                            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("stock")}
                         />
                     </div>

                     {/* Slug */}
                     <div className="flex flex-col">
                         <label className="text-gray-600 mb-2">Slug</label>
                         <input
                             type="text"
                             name="slug"
                             placeholder="slug..."
                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                             {...register("slug", { required: true })}
                         />
                     </div>

                     {/* Description */}
                     <div className="flex flex-col">
                         <label className="text-gray-600 mb-2">Description</label>
                         <textarea
                             name="description"
                             placeholder="Description..."
                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                             {...register("description", {required: true})}
                         ></textarea>
                     </div>

                     {/* Price */}
                     <div className="flex flex-col">
                         <label className="text-gray-600 mb-2">Price</label>
                         <input
                             type="number"
                             name="price"
                             placeholder="Price..."
                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                             {...register("price", { required: true })}
                         />
                     </div>

                     {/* Status */}
                     <div className="flex flex-col">
                         <label className="text-gray-600 mb-2">Status</label>
                         <select
                             name="status"
                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                             {...register("status", { required: true })}
                         >
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                         </select>
                     </div>

                     {/* Submit Button */}
                     <div className="text-center">
                         <button
                             type="submit"
                             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                         >
                             {post ? "Update Post" : "Add Post"}
                         </button>
                     </div>
                 </form>
             </div>
         </div>
    );
}








// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */

// import { useCallback, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import service from "../../appwrite/config";
// // import  authService  from "../../appwrite/auth";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } =
//         useForm({
//             defaultValues: {
//                 title: post?.title || "",
//                 slug: post?.$id || "",
//                 description: post?.description || "",
//                 price: post?.price || 0,
//                 stock: post?.stock || 0,
//                 status: post?.status || "active"
//             },
            
//         });
    
//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);
//     console.log(userData)

//     const submit = async (data) => {
       
//         // const currentUser = await account.get();

//         // if (!currentUser) {
//         //     console.log('User is not authenticated');
//         //     return;
//         // }

//         if (post) {
//             const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
//             console.log(file)

//             if (file) {
//                 service.deleteFile(post.featuredImage);
//             }

//             const dbPost = await service.updatePost(post.$id, {
//                 ...data,
//                 productImg: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             const file = await service.uploadFile(data.image[0]);

//             if (file) {
//                 const fileId = file.$id;
//                 data.productImg = fileId;
//                 const dbPost = await service.createProductDocument({ ...data });
//                   console.log(dbPost)
//                 // if (dbPost) {
//                 //     navigate(`/post/${dbPost.$id}`);
//                 // }
//             }
//         }
//     };

    

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <div className="container max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//             <div className="grid grid-cols-1 gap-6">
//                 <h1 className="text-3xl font-bold text-center text-gray-700">
//                     {post ? "Edit Post" : "Create New Post"}
//                 </h1>

//                 <form onSubmit={handleSubmit(submit)}>
//                     {/* File Input */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-600 mb-2">Upload File</label>
//                         <input
//                             type="file"
//                             name="image"
//                             className="border border-gray-300 p-2 rounded-lg"
//                             accept="image/png, image/jpg, image/jpeg"
//                             {...register("image", { required: !post })}
//                         />
//                     </div>
//                     {post && post.productImg && (
//                         <div className="w-full mb-4">
//                             <img
//                                 src={service.getFilePreview(post.productImg)}
//                                 alt={post.title}
//                                 className="rounded-lg"
//                             />
//                         </div>
//                     )}

//                     {/* Product Name */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-600 mb-2">Product Name</label>
//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Please write product name..."
//                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             {...register("title", { required: true })}
//                         />
//                     </div>

//                     <div className="flex flex-col">
//                         <label className="text-gray-600 mb-2">stock</label>
//                         <input
//                             type="number"
//                             name="stock"
//                             placeholder="stock"
//                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             {...register("stock")}
//                         />
//                     </div>

//                     {/* Slug */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-600 mb-2">Slug</label>
//                         <input
//                             type="text"
//                             name="slug"
//                             placeholder="slug..."
//                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             {...register("slug", { required: true })}
//                         />
//                     </div>

//                     {/* Description */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-600 mb-2">Description</label>
//                         <textarea
//                             name="description"
//                             placeholder="Description..."
//                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             {...register("description", {required: true})}
//                         ></textarea>
//                     </div>

//                     {/* Price */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-600 mb-2">Price</label>
//                         <input
//                             type="number"
//                             name="price"
//                             placeholder="Price..."
//                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             {...register("price", { required: true })}
//                         />
//                     </div>

//                     {/* Status */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-600 mb-2">Status</label>
//                         <select
//                             name="status"
//                             className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             {...register("status", { required: true })}
//                         >
//                             <option value="Active">Active</option>
//                             <option value="Inactive">Inactive</option>
//                         </select>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="text-center">
//                         <button
//                             type="submit"
//                             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                         >
//                             {post ? "Update Post" : "Add Post"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default PostForm;
