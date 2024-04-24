"use client";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import logo from "@/public/logo-no-background.png";
import { Avatar, Flex } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import delay from "delay";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FcAssistant } from "react-icons/fc";
import { FiMenu } from "react-icons/fi";
import { IoClose, IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

const mobileLinks = [
  { label: "Home", href: "/" },
  { label: "Chatbot", href: "/chatbot" },
  { label: "Finance", href: "/finance" },
  { label: "Goal", href: "/goal" },
  { label: "Task", href: "/task" },
  { label: "Sign Out", href: "/sign-out" },
];

const TestingPage = () => {
  const [messages, setMessage] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [chat, openChat] = useState(true);
  const [menu, openMenu] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const requestData: any = {
    question: userMessage,
  };

  if (sessionId) {
    requestData.overrideConfig = {
      sessionId: sessionId,
    };
  }

  if (status === "unauthenticated")
    return <UnauthorizedAccess title="Please sign in to access the chatbot." />;

  return (
    <>
      <div className="absolute h-[100vh] w-screen z-10 bg-black top-0">
        <Flex
          align="center"
          justify="center"
          className="min-h-screen relative mx-auto"
          direction="column"
          gap="3"
          maxWidth="1000px"
        >
          <button
            className="border p-5 rounded-md w-[200px]"
            onClick={() => openChat(true)}
          >
            Open Chatbot
          </button>
          <Link href="/" className="hover:scale-110 top-5 left-5 absolute">
            <Image src={logo} alt="Logo Icon" width={100} />
          </Link>
          <button
            className="absolute top-5 right-5"
            onClick={() => openMenu(true)}
          >
            <FiMenu size={35} />
          </button>
        </Flex>
      </div>
      {menu && (
        <div className="absolute h-screen w-screen z-20 bg-black top-0">
          <Flex
            className="h-screen relative mx-auto p-5"
            direction="column"
            gap="7"
            maxWidth="1000px"
          >
            <button
              className="self-end top-5 right-5 hover:scale-110"
              onClick={() => openMenu(false)}
            >
              <IoClose size="30" />
            </button>
            {mobileLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={classNames({
                  "text-indigo-500 font-semibold": link.href === currentPath,
                  "text-lg ml-5 max-w-[100px]": true,
                })}
              >
                {link.label}
              </Link>
            ))}
          </Flex>
        </div>
      )}
      {chat && (
        <div className="absolute h-screen w-screen z-20 bg-black top-0">
          <Flex
            direction="column"
            align="center"
            justify="center"
            className="m-auto min-h-screen relative"
            maxWidth="1000px"
          >
            <button
              className="sticky self-end top-5 right-5 hover:scale-110"
              onClick={() => openChat(false)}
            >
              <IoClose size="30" />
            </button>
            <Flex
              align="center"
              className="m-auto h-screen mt-[40px] relative p-5 overflow-y-scroll"
              direction={"column"}
              width={{ initial: "95%", md: "70%" }}
              maxHeight="80vh"
              gap="5"
            >
              <text className="rounded-[20px] p-5 my-2 self-start text-sm max-w-[90%] sm:max-w-[70%] relative bg-white text-black">
                Hello! How can I assist you?
                <FcAssistant className="absolute bottom-[-10px] left-[-10px] text-[30px]" />
              </text>
              {messages.map((message, index) => {
                const isUserMessage = index % 2 === 0;
                const className = isUserMessage
                  ? "chat-message self-end bg-blue-600 z-[-1]"
                  : "chat-message self-start bg-white text-black z-[-1]";

                return (
                  <text className={className} key={index}>
                    <ReactMarkdown>{message}</ReactMarkdown>
                    {isUserMessage ? (
                      <Avatar
                        color="blue"
                        src={session?.user?.image!}
                        fallback="?"
                        radius="full"
                        className="absolute bottom-[-12px] right-[-12px]"
                        size="2"
                      />
                    ) : (
                      <FcAssistant className="absolute bottom-[-10px] left-[-10px] text-[30px]" />
                    )}
                  </text>
                );
              })}
              <div ref={bottomRef} />
            </Flex>
            <Flex
              width={{ initial: "95%", md: "70%" }}
              className="bottom-3 absolute"
              align="center"
              justify="center"
              gap="3"
            >
              <textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your question here!"
                className="p-3 rounded-2xl w-[90%] bg-transparent border"
                rows={2}
              />
              <button
                onClick={async () => {
                  setMessage((prev) => [...prev, userMessage]);
                  setUserMessage("");
                  await delay(800);
                  setMessage((prev) => [...prev, "Formulating a response..."]);
                  try {
                    const data = await axios
                      .post("/api/chatbot", requestData)
                      .then((res) => res.data);
                    console.log(data);
                    setSessionId(data.sessionId);
                    setMessage((prevMessages) => {
                      let newMessages = [...prevMessages];
                      newMessages[newMessages.length - 1] = data.text;
                      return newMessages;
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <IoSend className="text-[20px] text-blue-300" />
              </button>
            </Flex>
          </Flex>
        </div>
      )}
    </>
  );
};

export default TestingPage;
