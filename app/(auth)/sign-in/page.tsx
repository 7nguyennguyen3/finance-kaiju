"use client";
import { signInSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { z } from "zod";

const SignInPage = () => {
  const { status, data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState("password" || "text");

  type CredentialValidation = z.infer<typeof signInSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialValidation>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen"
      gap="4"
    >
      {status === "authenticated" && (
        <>
          <Heading>Welcome {session.user!.name}!</Heading>
          <Text>You are already signed in.</Text>
        </>
      )}
      {status === "unauthenticated" && (
        <>
          <Heading size="6">Sign In</Heading>
          <div className="w-72">
            <Flex direction="column" gap="3" justify="center">
              <form
                onSubmit={handleSubmit(async () => {
                  try {
                    signIn("credentials", {
                      email: email.toLowerCase(),
                      password,
                    });
                  } catch (error) {}
                })}
              >
                <Flex direction="column" gap="3" justify="center">
                  <div className="w-full">
                    <input
                      {...register("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                      className="px-2 py-2 rounded-md w-full"
                    />
                    {errors.email && (
                      <Box className="mt-2 ml-1">
                        <Text color="crimson">{errors.email.message}</Text>
                      </Box>
                    )}
                  </div>
                  <div>
                    <Flex position="relative" className="w-full">
                      <input
                        {...register("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type={eye}
                        className="px-2 py-2 rounded-md my-1 w-full"
                      />
                      <Box className="absolute top-1/2 right-3  p-2 transform -translate-y-1/2 scale-150">
                        {eye === "text" && (
                          <FaEye onClick={() => setEye("password")} />
                        )}
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
                    className="border border-blue-200 py-2 px-5 rounded-md hover:scale-110"
                  >
                    Sign In
                  </button>
                </Flex>
              </form>
              <Separator size="4" color="blue" className="my-1" />
              <Text className="flex justify-center">
                {"Don't have an account?"}
                <Text className="ml-2">
                  <Link href="/sign-up" className="text-blue-200 underline">
                    Sign up here!
                  </Link>
                </Text>
              </Text>
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
          </div>
        </>
      )}
    </Flex>
  );
};

export default SignInPage;
