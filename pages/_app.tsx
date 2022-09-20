import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../lib/auth";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
