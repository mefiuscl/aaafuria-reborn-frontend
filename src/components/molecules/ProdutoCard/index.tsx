import * as gtag from 'lib/gtag';

import { gql, useMutation } from '@apollo/client';
import { Heading, HStack, Stack } from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  Image,
  Select,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PriceTag } from '@/components/atoms';
import { CustomButton } from '@/components/atoms/CustomButton';
import { Card } from '@/components/molecules';
import { AuthContext } from '@/contexts/AuthContext';
import { ColorContext } from '@/contexts/ColorContext';
import { ProductType } from '@/pages/loja';
import { useRouter } from 'next/router';
import { MdShoppingCart } from 'react-icons/md';

const ADD_TO_CART = gql`
  mutation addToCart($itemId: ID!, $quantity: Int!, $description: String) {
    addToCart(itemId: $itemId, quantity: $quantity, description: $description) {
      ok
    }
  }
`;

export const ProdutoCard = ({ node: product }: { node: ProductType }) => {
  const router = useRouter();
  const { green } = useContext(ColorContext);
  const { isAuthenticated, token } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<any>();

  const fontSize = useBreakpointValue(['xs', 'sm']);

  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    context: {
      headers: {
        Authorization: `JWT ${token || ' '}`,
      },
    },
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<any> = useCallback(
    (formData) => {
      if (!isAuthenticated) {
        router.push(`/entrar?after=${router.asPath}`);
      }
      const productId = formData.variacaoId || product.id;
      const quantidade = 1;
      const observacoes = formData.observacoes;

      addToCart({
        variables: {
          itemId: productId,
          quantity: quantidade,
          description: observacoes,
        },
      })
        .then(() => {
          toast({
            title: `[${product.name}] adicionado ao carrinho!`,
            description: (
              <CustomButton
                colorScheme={'green'}
                variant="solid"
                leftIcon={<MdShoppingCart size="25px" />}
                shadow="base"
                onClick={() => router.push('/cart')}
              >
                Ir para o carrinho
              </CustomButton>
            ),
            status: 'success',
            isClosable: true,
            duration: 2500,
            position: 'top-left',
          });
          gtag.event({
            action: 'add_to_cart',
            category: 'ecommerce',
            label: product.name,
            value: 1,
            items: [
              {
                id: product.id,
                price: product.price,
                name: product.name,
                quantity: 1,
              },
            ],
          });
        })
        .catch((error) => {
          toast({
            title: 'Erro',
            description: error.message,
            status: 'warning',
            duration: 2500,
            isClosable: true,
            position: 'top-left',
          });
          return;
        });
    },
    [isAuthenticated, product, addToCart, router, toast],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        key={product.id}
        position="relative"
        overflow="hidden"
        px="0"
        py="0"
      >
        <Image
          w="full"
          objectFit="cover"
          src={product.image}
          mx="auto"
          alt={product.name}
        />
        <Stack>
          <Stack p={4}>
            <Stack>
              <Heading as="h3" size={fontSize}>
                {product.name.toUpperCase()}
              </Heading>
              <PriceTag
                as="h4"
                fontSize={fontSize}
                price={product.price as number}
                discountedPrice={product.membershipPrice}
              />
            </Stack>
            <HStack>
              <FormControl
                visibility={
                  product?.variations?.edges.length > 0 ? 'visible' : 'hidden'
                }
              >
                <Select
                  focusBorderColor={green}
                  placeholder="Selecione o tamanho"
                  required={
                    product?.variations?.edges.length > 0 ? true : false
                  }
                  {...register('variacaoId')}
                >
                  {product.variations.edges.map(({ node }) => (
                    <option key={node.id} value={node.id}>
                      {node.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
          </Stack>
          <Button
            type="submit"
            rounded="0"
            leftIcon={<MdShoppingCart size="20px" />}
            colorScheme="green"
            isLoading={loading}
            loadingText="Adicionando..."
          >
            {isAuthenticated
              ? 'Adicionar ao carrinho'
              : 'Faça login para comprar'}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};
