"use client";
import { Button, Flex, Heading } from "@radix-ui/themes";
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
    <>
      <Flex
        direction="column"
        gap="5"
        align="center"
        className="min-h-screen border border-sky-500 m-auto"
        justify="center"
        maxWidth={{ initial: "100%", md: "720px" }}
      >
        {!publicId && (
          <Flex
            justify="center"
            align="center"
            className="border border-red-200"
            width="66%"
            height="300px"
          >
            Please upload an image
          </Flex>
        )}
        {publicId && (
          <CldImage
            src={publicId}
            width={512}
            height={240}
            alt="uploaded image"
            className="border-2 border-white rounded-md max-w-lg"
          />
        )}
        <Heading>Fill out information to create task!</Heading>
        <input
          placeholder="Title of Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-2/3 px-2 pb-7 py-3  focus:border-2 focus:border-white focus:outline-none rounded-md"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-2/3 px-2 pb-12  py-3 focus:border-2 focus:border-white focus:outline-none rounded-md"
        />

        <Flex justify="between" width="66%">
          <CldUploadWidget
            uploadPreset="p1mv73w6"
            onUpload={(result) => {
              const info = result.info as CloudinaryResult;
              console.log(info.secure_url);
              setUrl(info.secure_url);
              setPublicId(info.public_id);
            }}
          >
            {({ open }) => (
              <Button onClick={() => open()}>Upload Images</Button>
            )}
          </CldUploadWidget>

          <Button
            disabled={!publicId}
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
      </Flex>
    </>
  );
};

export default CreateTaskPage;
