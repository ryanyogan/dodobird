import { Box } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <>
    <NavBar />
    <Box maxW="650px" mx="auto" px={8} w="100%" wordBreak="break-all">
      {children}
    </Box>
    <Footer />
  </>;
}
