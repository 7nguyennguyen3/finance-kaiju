"use client";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

const CreateNewGoal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createGoal = async () => {
    axios
      .post("/api/goal", {
        title,
        description,
      })
      .then((res) => console.log(res.data));
  };
  return (
    <>
      <TextField.Root
        placeholder="Title of goal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField.Root
        placeholder="Description of goal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button onClick={createGoal}>Create Goal</Button>
    </>
  );
};

export default CreateNewGoal;
