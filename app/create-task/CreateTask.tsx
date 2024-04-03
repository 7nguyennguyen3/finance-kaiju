"use client";
import { Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

const CreateTaskPage = () => {
  const [publicId, setPublicId] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  return (
    <Flex
      direction="column"
      gap="3"
      align="center"
      className="min-h-screen border border-sky-500 m-5"
      justify="center"
    >
      <CldUploadWidget
        uploadPreset="p1mv73w6"
        onUpload={(result) => {
          const info = result.info as CloudinaryResult;
          console.log(info.secure_url);
          setUrl(info.secure_url);
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => <Button onClick={() => open()}>Upload Images</Button>}
      </CldUploadWidget>

      {publicId && (
        <CldImage src={publicId} width={200} height={200} alt="an elk" />
      )}
      <TextField.Root
        placeholder="Title of Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        size="3"
        resize="vertical"
      />

      <Button
        className="hover:bg-red-500"
        color="crimson"
        onClick={async () => {
          try {
            const response = await axios.post("/api/task", {
              title,
              description,
              imgUrl: url,
              status: "COMPLETE",
            });
            console.log("Task uploaded successfully:", response.data);
            router.push("/task");
          } catch (error) {
            console.error("Error uploading task:", error);
          }
        }}
      >
        Create Task
      </Button>
    </Flex>
  );
};

export default CreateTaskPage;
