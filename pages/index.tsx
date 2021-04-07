import { GetStaticProps } from "next";
import React from "react";
import api from "../products/api";
import { Product } from "../products/types";
import { Box, Button, Flex, Grid, Link, Stack, Text } from "@chakra-ui/react";

interface IndexPageProps {
  products: Product[];
}

function parseCurrency(value: number): string {
  return `${value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })}`;
}

const IndexPage: React.FC<IndexPageProps> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);
  const text = cart
    .reduce<string>(
      (message, product) =>
        message.concat(`* ${product.name} - ${parseCurrency(product.price)}\n`),
      ""
    )
    .concat(
      `\nTotal: ${parseCurrency(
        cart.reduce<number>((total, product) => total + product.price, 0)
      )}`
    );

  function handleAddToCart(product: Product) {
    setCart((cart) => cart.concat(product));
  }

  return (
    <Box minHeight="100vh" height="full">
      <Grid
        gridGap={6}
        spacing={6}
        templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
      >
        {products.map((product) => (
          <Flex
            spacing={3}
            key={product.id}
            borderRadius="md"
            padding={4}
            backgroundColor="gray.100"
          >
            <Stack spacing={1} width="100%">
              <Text>{product.name}</Text>
              <Text fontSize="sm" color="green.500" fontWeight={500}>
                {parseCurrency(product.price)}
              </Text>
              <Button
                colorScheme="primary"
                variant="outline"
                onClick={() => handleAddToCart(product)}
                size="sm"
              >
                Agregar
              </Button>
            </Stack>
          </Flex>
        ))}
      </Grid>
      {cart.length > 0 && (
        <Flex
          alignItems="center"
          justifyContent="center"
          padding={4}
          bottom={4}
          left={0}
          right={0}
          position="fixed"
        >
          <Button
            as={Link}
            colorScheme="whatsapp"
            href={`https://wa.me/+541149178655?text=${encodeURIComponent(
              text
            )}`}
            isExternal
          >
            Completar pedido ({cart.length} productos)
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    props: {
      products,
    },
    revalidate: 10, // 10 seconds
  };
};

export default IndexPage;
