"use client";
import { Avatar, Container, Flex, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FcAssistant } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import delay from "delay";
import ReactMarkdown from "react-markdown";

const TestingPage = () => {
  const [message, setMessage] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const requestData: any = {
    question: userMessage,
  };

  if (sessionId) {
    requestData.overrideConfig = {
      sessionId: sessionId,
    };
  }

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
        {message.map((message, index) => {
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
                  src="https://lh3.googleusercontent.com/a/ACg8ocKazo8a_SBSb5BcPsezBlnPyZLE1CmGWx7KFDt6dVXHESM7ws4w=s317-c-no"
                  fallback="?"
                  radius="full"
                  className="absolute bottom-[-12px] right-[-12px]"
                  size="2"
                />
              ) : (
                <FcAssistant className="absolute bottom-[-10px] left-[-10px] text-[30px]" />
              )}
              {isLoading && !isUserMessage && (
                <Text>
                  Formulating a response...
                  <Spinner />
                </Text>
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
            await delay(1000);
            setMessage((prev) => [...prev, ""]);
            setIsLoading(true);
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
              setIsLoading(false);
            } catch (error) {
              console.log(error);
              setIsLoading(false);
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
