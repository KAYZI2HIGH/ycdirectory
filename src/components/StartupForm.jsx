'use client'

import { addPitchAction } from "@/sanity/lib/action";
import { Send } from "lucide-react";
import { revalidatePath } from "next/cache";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { CircularProgress } from "sanity";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const StartupForm = () => {

  const router = useRouter()

  const [pitch, setPitch] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm();

  const [serverMessage, setServerMessage] = useState(null)

    const onSubmit = async (data) => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("pitch", data.pitch);

         if (data.image[0]) {
           formData.append("image", data.image[0]); // Attach the file
         }

        
        const res = await addPitchAction(formData);
        if (res.error) setServerMessage({ type: "error", message: res.error });
        setServerMessage({ type: "success", message: res.success });

        reset();
        setPitch('')
        router.push(`/startup/${res.info._id}`)
      } catch (error) {
        console.log(error);
        console.log("Something went wrong when submitting new property to DB.");
      }
    };

  const handlePitchChange = (value) => {
    setPitch(value || '')
  setValue('pitch', value || '', {shouldValidate: true})
}

 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      {serverMessage?.type === 'success' && <div className="w-full p-5 bg-green-500 text-white">{serverMessage?.message}</div>} {serverMessage?.type === 'error' && <div className="w-full p-5 bg-red-500 text-white">{serverMessage?.message}</div>}
      <div className="space-y-3">
        <label
          htmlFor="title"
          className="section_title  font-bold uppercase ml-4"
        >
          title
        </label>
        <input
          name="title"
          type="text"
          placeholder="Startup Title"
          {...register("title", {
            required: "This field is required.",
          })}
          className="input_fields"
        />
        {errors.title && (
          <p className="font-medium ml-4 tracking-wide text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="description"
          className="section_title  font-bold uppercase ml-4"
        >
          description
        </label>
        <textarea
          name="description"
          type="text"
          placeholder="Startup Description"
          {...register("description", {
            required: "This field is required.",
          })}
          className="input_fields !rounded-3xl h-40"
        />
        {errors.description && (
          <p className="font-medium ml-4 tracking-wide text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="category"
          className="section_title  font-bold uppercase ml-4"
        >
          category
        </label>
        <input
          name="category"
          type="text"
          placeholder="Startup Category (Tech, Health, Education ...)"
          {...register("category", {
            required: "This field is required.",
          })}
          className="input_fields"
        />
        {errors.category && (
          <p className="font-medium ml-4 tracking-wide text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="image"
          className="section_title  font-bold uppercase ml-4"
        >
          image
        </label>
        <input
          name="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: "Please upload an image.",
            validate: (value) => {
              if (!value || value.length === 0) return "No file selected.";
              const file = value[0];
              const validTypes = ["image/jpeg", "image/png", "image/webp"];
              if (!validTypes.includes(file.type)) {
                return "Only JPEG, PNG, or WebP images are allowed.";
              }
              if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                return "Image size should not exceed 5MB.";
              }
              return true;
            },
          })}
          className="block py-3 px-4 border-[5px] w-full rounded-full border-black"
        />
        {errors.image && (
          <p className="font-medium ml-4 tracking-wide text-red-500">
            {errors.image.message}
          </p>
        )}
      </div>
      <div
        className="space-y-3"
        data-color-mode="light"
      >
        <label
          htmlFor="pitch"
          className="section_title  font-bold uppercase ml-4"
        >
          pitch
        </label>
        {/* <input name="pitch" type="text"
          {...register('pitch', {
            required: 'This field is required.'
          })}
          className="block py-3 px-4 border-2 w-full rounded-full border-black" /> */}
        <MDEditor
          value={pitch}
          onChange={(value) => handlePitchChange(value)}
          style={{ borderRadius: "20px", overflow: "hidden", padding: "5px" }}
          preview="edit"
          height={300}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves.",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        <textarea
          id="markdown"
          style={{ display: "none" }} // Hide the textarea
          {...register("pitch", {
            required: "Pitch is required.",
            validate: (value) => {
              if (value.length < 20)
                return "Pitch must be at least 20 characters long.";
              return true;
            },
          })}
        />
        {errors.pitch === "" && (
          <p className="font-medium ml-4 tracking-wide text-red-500">
            {errors.pitch.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full p-4 uppercase text-white bg-pink-600 border-[5px] border-black flex justify-center items-center font-semibold rounded-full gap-2 tracking-wide"
      >
        {isSubmitting ? 'sending...' : <>submit your startup <Send size={18} /></>}
      </button>
    </form>
  );
}

export default StartupForm