"use client";
import { Box, Container, Flex, Heading, ScrollArea } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";

const TestingPage = () => {
  const [message, setMessage] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");

  //   const streamResponse = (response: any) => {
  //     const words = response.split(" ");
  //     let i = 0;

  //     const intervalId = setInterval(() => {
  //       setChatbotMessages((prevMessages) => [...prevMessages, words[i]]);
  //       i++;

  //       if (i >= words.length) {
  //         clearInterval(intervalId);
  //       }
  //     }, 500); // Adjust the delay as needed
  //   };

  return (
    <Container className="mt-[-40px]">
      <ScrollArea scrollbars="vertical" style={{ height: 800 }}>
        <Flex
          align="center"
          className="mx-auto  relative p-5"
          direction={"column"}
          width={{ initial: "90%", md: "60%" }}
          height="800px"
          gap="5"
        >
          <text className="border rounded-[20px] p-5 my-2 self-start text-sm max-w-[60%]">
            Hello! How can I assist you?
          </text>
          <text className="border rounded-[20px] p-5 my-2 self-end text-sm max-w-[60%]">
            Below at the input is where you can ask question!
          </text>
          <text className="border rounded-[20px] p-5 my-2 self-start text-sm max-w-[60%]">
            And this is where the chat will be responding to you. Please feel
            free to ask anything you like!
          </text>
          {message.map((message, index) => {
            const isUserMessage = index % 2 === 0;
            const className = isUserMessage
              ? "border rounded-[20px] p-5 self-end max-w-[70%] my-2 text-sm"
              : "border rounded-[20px] p-5 self-start max-w-[70%] my-2 text-sm";

            return (
              <text key={index} className={className}>
                {message}
              </text>
            );
          })}
          <Flex
            direction={{ initial: "column", xs: "row" }}
            className="bottom-0 w-full mt-5"
            align="center"
            gap="3"
          >
            <input
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your question here!"
              className="p-5 rounded-2xl w-[90%]"
            />
            <button
              className="border w-[60px] h-[40px] "
              onClick={async () => {
                setMessage((prev) => [...prev, userMessage]);
                setUserMessage("");
                const data = await axios
                  .post(
                    "http://localhost:3000/api/v1/prediction/4ca84285-e3c5-40d1-b9c3-bed7bb8fabe1",
                    {
                      question: userMessage,
                    }
                  )
                  .then((res) => res.data);
                console.log(data);
                setMessage((prevMessages) => [...prevMessages, data.text]);
              }}
            >
              Send
            </button>
          </Flex>
        </Flex>
      </ScrollArea>
    </Container>
  );
};

export default TestingPage;
