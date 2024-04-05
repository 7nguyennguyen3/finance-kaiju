import {
  Box,
  Container,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <Separator color="blue" size="4" className="mt-20" />
      <Container
        className="my-20"
        maxWidth={{ initial: "75%", sm: "50%", md: "40%", lg: "30%" }}
      >
        <Flex justify="between">
          <Flex direction="column" gap="3" className="mr-10">
            <Heading>Logo</Heading>
            <Text size="2">Copyright © 2024</Text>
            <Text size="2">All rights reserved</Text>
            <Flex gap="2">
              <FaFacebook />
              <FaYoutube />
              <FaTwitch />
              <FaTwitter />
              <FaInstagram />
            </Flex>
          </Flex>
          <Flex direction={{ initial: "column" }} gap="2">
            <Heading size="4">Company</Heading>
            <Text>Blog</Text>
            <Text>Pricing</Text>
            <Text>About Us</Text>
            <Text>Contact Us</Text>
            <Text>Testimonials</Text>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Footer;
