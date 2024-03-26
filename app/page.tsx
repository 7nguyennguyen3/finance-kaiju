import { Blockquote, Box, Card, Flex, Separator, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-screen"
      direction="column"
    >
      Current Goals
      <Box maxWidth="360px">
        <Card>
          <Flex direction="column" className="px-3" gap="1">
            <Text className="font-semibold">Goal 1</Text>
            <Separator my="1" size="4" />
            <Blockquote>
              Description of Goal 1, Hello World. Lorem ipsum kasjdklasjdlkas
            </Blockquote>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}
