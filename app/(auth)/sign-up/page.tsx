"use client";
import { credentialSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState("password" || "text");
  const router = useRouter();

  type CredentialValidation = z.infer<typeof credentialSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialValidation>({
    resolver: zodResolver(credentialSchema),
  });

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen"
      gap="4"
    >
      <Heading size="6">Sign Up</Heading>
      <form
        className="w-72"
        onSubmit={handleSubmit(async () => {
          await axios.post("/api/credential", {
            name,
            email: email.toLowerCase(),
            password,
          });
          router.push("/sign-in");
        })}
      >
        <Flex direction="column" gap="3" justify="center">
          <div className="w-full">
            <input
              {...register("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type="text"
              className="w-full px-2 py-3  focus:border-2 focus:border-white focus:outline-none rounded-md"
            />
            {errors.name && (
              <Box className="mt-2 ml-1">
                <Text color="crimson">{errors.name.message}</Text>
              </Box>
            )}
          </div>
          <div>
            <input
              {...register("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full px-2 py-3  focus:border-2 focus:border-white focus:outline-none rounded-md"
            />
            {errors.email && (
              <Box className="mt-2 ml-1">
                <Text color="crimson">{errors.email.message}</Text>
              </Box>
            )}
          </div>
          <div>
            <Flex position="relative">
              <input
                {...register("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type={eye}
                className="w-full px-2 py-3  focus:border-2 focus:border-white focus:outline-none rounded-md"
              />
              <Box className="absolute top-1/2 right-3  p-2 transform -translate-y-1/2 scale-150">
                {eye === "text" && <FaEye onClick={() => setEye("password")} />}
                {eye === "password" && (
                  <FaEyeSlash onClick={() => setEye("text")} />
                )}
              </Box>
            </Flex>
            {errors.password && (
              <Box className="mt-2 ml-1">
                <Text color="crimson">{errors.password.message}</Text>
              </Box>
            )}
          </div>
          <button
            type="submit"
            className="border border-blue-200 py-2 px-5 mt-2 rounded-md hover:scale-110"
          >
            Sign Up
          </button>
          <Separator size="4" color="blue" className="my-1" />
          <button
            onClick={async () => {
              signIn("google", {
                callbackUrl: "https://goal-tracker-nine-iota.vercel.app",
              });
            }}
            type="button"
            className="border border-red-200 py-2 px-5 rounded-md hover:scale-110"
          >
            <Flex align="center" gap="2" justify="center">
              <Text>Sign in with Google</Text>
              <FaGoogle size="18" className="text-red-400" />
            </Flex>
          </button>
          <button
            type="button"
            className="border border-violet-200 py-2 px-5 rounded-md hover:scale-110"
          >
            <Flex align="center" gap="2" justify="center">
              <Text>Sign in with GitHub</Text>
              <FaGithub size="18" className="text-violet-400" />
            </Flex>
          </button>
        </Flex>
      </form>
    </Flex>
  );
};

export default SignUpPage;
