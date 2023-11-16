import { apiSlice } from "../../app/api/apiSlice";

export const imgApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (imageFile) => {
        let data = new FormData();
        data.append("image", imageFile);
        return {
          url: "upload-image/",
          method: "POST",
          body: data,
          formData: true,
        };
      },
    }),
    deleteImage: builder.mutation({
      query: (img) => ({
        url: `delete-image/${img}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = imgApiSlice;
