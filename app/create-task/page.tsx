"use client";
import React, { use, useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import prisma from "@/prisma/client";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

const CreateTaskPage = () => {
  const [publicId, setPublicId] = useState("");
  const [url, setUrl] = useState("");

  return (
    <Flex direction="column" gap="3">
      {publicId && (
        <CldImage src={publicId} width={200} height={200} alt="an elk" />
      )}
      <CldUploadWidget
        uploadPreset="p1mv73w6"
        onUpload={(result) => {
          const info = result.info as CloudinaryResult;
          console.log(info.secure_url);
          setUrl(info.secure_url);
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => <Button onClick={() => open()}>Upload</Button>}
      </CldUploadWidget>
      <button
        className="hover:bg-red-500"
        onClick={async () => {
          try {
            const response = await axios.post("/api/task", { imgUrl: url });
            console.log("Task uploaded successfully:", response.data);
            // Handle success (e.g., show a success message to the user)
          } catch (error) {
            console.error("Error uploading task:", error);
            // Handle error (e.g., show an error message to the user)
          }
        }}
      >
        Upload to Database
      </button>
    </Flex>
  );
};

export default CreateTaskPage;
