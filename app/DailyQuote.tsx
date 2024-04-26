import { Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaRecycle } from "react-icons/fa";

const DailyQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);
    };

    fetchQuote();
  }, []);

  return (
    <Flex
      className="border border-emerald-300 p-5 w-[90%] max-w-[400px] rounded-md"
      align="center"
      justify="center"
      direction="column"
      gap="3"
    >
      <Flex align="center" gap="3" display={quote === "" ? "none" : "flex"}>
        <Heading size="4">Daily Quote</Heading>
        <button
          className="hover:scale-110"
          onClick={async () => {
            const data = await axios
              .get("https://api.quotable.io/random")
              .then((res) => res.data);

            setQuote(data.content);
          }}
        >
          <FaRecycle size={30} className="text-blue-400" />
        </button>
      </Flex>
      <Heading size="3">{`"${quote}" - ${author}`}</Heading>
    </Flex>
  );
};

export default DailyQuote;
