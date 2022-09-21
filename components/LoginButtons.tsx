import { Button, Flex } from "@chakra-ui/react";
import { useAuth } from "lib/auth";

export default function LoginButtons() {
  const auth = useAuth();

  return (
    <Flex direction={["column", "row"]}>
      <Button
        onClick={() => auth.signinWithGoogle()}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        mr={2}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        Continue with GitHub
      </Button>
      <Button
        onClick={() => auth.signinWithGoogle()}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: "gray.100" }}
        _active={{
          bg: "gray.100",
          transform: "scale(0.95)",
        }}
      >
        Continue with Google
      </Button>
    </Flex>
  );
}
