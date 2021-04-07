import { AppProps } from "next/app";
import {
  ChakraProvider,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          backgroundColor="white"
          boxShadow="md"
          my={4}
          maxWidth="container.xl"
          padding={4}
        >
          <VStack mb={6}>
            <Image borderRadius="50%" src="//placehold.it/128x128" />
            <Heading>Almacency</Heading>
            <Text>El almacen de goncy</Text>
          </VStack>
          <Divider my={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
