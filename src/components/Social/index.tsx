import { IconButton } from '@chakra-ui/button';
import {
  Box,
  chakra,
  Divider,
  Heading,
  HStack,
  Link,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import NextLink from 'next/link';

export const Social = ({ ...rest }) => {
  const ChakraNextLink = chakra(NextLink);
  return (
    <Box {...rest}>
      <Divider h="15px" mb={4} />
      <Heading as="h3" size="sm" fontWeight="light" textAlign="center">
        <i>
          Siga a{' '}
          <Text as="span" color="green.800" fontWeight="bold">
            Fúria
          </Text>
          :
        </i>
      </Heading>
      <HStack justify="center" spacing={4} p={2}>
        <ChakraNextLink passHref href="https://facebook.com/aaafuria">
          <Link>
            <IconButton
              aria-label="Facebook"
              colorScheme="green"
              variant="ghost"
              icon={<AiFillFacebook size="35px" />}
            />
          </Link>
        </ChakraNextLink>

        <ChakraNextLink passHref href="https://instagram.com/aaafuria">
          <Link>
            <IconButton
              aria-label="Instagram"
              colorScheme="green"
              variant="ghost"
              icon={<AiFillInstagram size="35px" />}
            />
          </Link>
        </ChakraNextLink>
        <IconButton
          aria-label="Instagram"
          colorScheme="green"
          variant="ghost"
          icon={<FaTiktok size="35px" />}
          isDisabled
        />
      </HStack>
    </Box>
  );
};
