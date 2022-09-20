import { Avatar, Box, Button, Flex, Link } from "@chakra-ui/react";
import { useAuth } from "lib/auth";
import NextLink from "next/link";
import React from "react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        mb={[8, 16]}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link mr={8}>Icon</Link>
            </NextLink>
            <NextLink href="/sites" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {user && (
              <NextLink href="/account" passHref>
                <Button as="a" variant="ghost" mr={2}>
                  Account
                </Button>
              </NextLink>
            )}
            <Avatar size="sm" src={user?.photoURL} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0" direction="column" maxW="1250px" px={[0, 8, 8]}>
        {children}
      </Flex>
    </Box>
  );
}
