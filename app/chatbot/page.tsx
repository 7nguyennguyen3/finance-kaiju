"use client";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import { Avatar, Container, Flex } from "@radix-ui/themes";
import axios from "axios";
import delay from "delay";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FcAssistant } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

const TestingPage = () => {
  const [messages, setMessage] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

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
    <Container className="mt-[-40px]">
      <Flex
        align="center"
        className="mx-auto relative p-5 overflow-y-scroll"
        direction={"column"}
        width={{ initial: "95%", md: "70%" }}
        height={{ initial: "500px", xs: "800px" }}
        gap="5"
      >
        <text className="rounded-[20px] p-5 my-2 self-start text-sm max-w-[90%] sm:max-w-[70%] relative bg-white text-black">
          Hello! How can I assist you?
          <FcAssistant className="absolute bottom-[-10px] left-[-10px] text-[30px]" />
        </text>
        {messages.map((message, index) => {
          const isUserMessage = index % 2 === 0;
          const className = isUserMessage
            ? "chat-message self-end bg-blue-600"
            : "chat-message self-start bg-white text-black";

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
        className="bottom-0 mt-5 mx-auto mb-[-60px]"
        align="center"
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
          <IoSend className="text-[30px] text-blue-300" />
        </button>
      </Flex>
    </Container>
  );
};

export default TestingPage;
