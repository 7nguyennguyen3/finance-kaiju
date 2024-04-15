"use client";
import { Box, Button, Container, Flex, Heading } from "@radix-ui/themes";
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
    <Container>
      <Flex
        direction="column"
        gap="5"
        align="center"
        className="min-h-screen m-auto"
        justify="center"
        maxWidth={{ initial: "100%", md: "720px" }}
      >
        {!publicId && (
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
              <Flex
                justify="center"
                align="center"
                className="border border-red-200"
                width="300px"
                height="300px"
                onClick={() => open()}
              >
                Please upload an image.
              </Flex>
            )}
          </CldUploadWidget>
        )}
        {publicId && (
          <CldImage
            src={publicId}
            height={300}
            width={300}
            alt="uploaded image"
            className="border-2 border-white rounded-md max-w-lg"
          />
        )}
        <Heading size={{ initial: "4", xs: "5", sm: "6" }}>
          Fill out information to create task!
        </Heading>
        <Box width={{ initial: "90%", xs: "60%", md: "60%" }}>
          <input
            placeholder="Title of Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-form"
          />
        </Box>
        <Box width={{ initial: "90%", xs: "60%" }}>
          <textarea
            rows={5}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-form"
          />
        </Box>

        <Flex
          justify="between"
          width={{ initial: "90%", xs: "60%", md: "60%" }}
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
            {({ open }) => (
              <Button variant="classic" onClick={() => open()}>
                Upload Image
              </Button>
            )}
          </CldUploadWidget>

          <Button
            variant="classic"
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
    </Container>
  );
};

export default CreateTaskPage;
