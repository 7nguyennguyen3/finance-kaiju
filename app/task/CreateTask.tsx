"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DropdownMenu,
  Flex,
  Heading,
  Box,
  Text,
  Container,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoGoal } from "react-icons/go";
import { PiPlant } from "react-icons/pi";
import { goalSchema } from "../validationSchema";
import { z } from "zod";
import FlexBar from "@/components/FlexBar";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import classNames from "classnames";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}
type GoalValidation = z.infer<typeof goalSchema>;

const CreateTask = () => {
  const { data: session } = useSession();
  const [publicId, setPublicId] = useState("");
  const [url, setUrl] = useState("");
  const [task, openTask] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalValidation>({ resolver: zodResolver(goalSchema) });

  const isAuthorized = session?.user?.email !== "etermic123@gmail.com";

  return (
    <>
      <button
        disabled={isAuthorized}
        onClick={() => openTask(!task)}
        className="self-end mr-[60px]"
        hidden={isAuthorized}
      >
        <Flex
          align="center"
          gap="3"
          className={classNames({
            "border p-2 rounded-md border-blue-400": true,
          })}
        >
          <Text>Add Task</Text>
          <GoGoal className="text-blue-400 text-[34px]" />
        </Flex>
      </button>
      {task && (
        <div className="bg-black w-screen h-screen fixed top-0 left-0 z-10">
          <Container>
            <FlexBar className="h-screen relative" gap="3">
              <button
                className="absolute top-5 right-5 hover:scale-110"
                onClick={() => openTask(false)}
              >
                <IoClose size="30" />
              </button>
              <Heading align="center" color="blue">
                Create New Task!
              </Heading>
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
                      width="90vw"
                      maxWidth="450px"
                      height="300px"
                      onClick={() => open()}
                    >
                      An image is required. Please click to upload
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
                  className="border-2 border-white rounded-md max-w-[300px] max-h-[300px]"
                />
              )}
              <form
                onSubmit={handleSubmit(async () => {
                  try {
                    const response = await axios.post("/api/task", {
                      title,
                      description,
                      imgUrl: url,
                      status: "COMPLETE",
                    });
                    router.refresh();
                    console.log("Task uploaded successfully:", response.data);
                    openTask(false);
                  } catch (error) {
                    console.error("Error uploading task:", error);
                    openTask(false);
                  }
                })}
                className="w-[90vw] max-w-[450px]"
              >
                <Flex direction="column" gap="3" align="center">
                  <div className="w-full">
                    <input
                      {...register("title")}
                      placeholder="Title of Goal"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input-form"
                    />
                    {errors.title && (
                      <Box className="mt-2">
                        <Text color="crimson">{errors.title.message}</Text>
                      </Box>
                    )}
                  </div>
                  <div className="w-full">
                    <textarea
                      rows={4}
                      {...register("description")}
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="input-form"
                    />
                    {errors.description && (
                      <Text color="crimson">{errors.description.message}</Text>
                    )}
                  </div>
                  <button
                    disabled={publicId === ""}
                    className={classNames({
                      "btn-form border-blue-400 w-[50%]": true,
                      "opacity-50 cursor-not-allowed hover:scale-100":
                        !publicId,
                    })}
                    type="submit"
                  >
                    <Flex align="center" justify="center" gap="2">
                      Create Task
                      <PiPlant />
                    </Flex>
                  </button>
                </Flex>
              </form>
            </FlexBar>
          </Container>
        </div>
      )}
    </>
  );
};

export default CreateTask;
