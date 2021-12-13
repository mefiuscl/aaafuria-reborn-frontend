import React from 'react';
import { FaTiktok } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/button';
import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/react';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import CustomChakraNextLink from '../CustomChakraNextLink';

export const Social = ({ ...rest }) => {
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
        <CustomChakraNextLink href="https://facebook.com/aaafuria">
          <IconButton
            aria-label="Facebook"
            colorScheme="green"
            variant="ghost"
            icon={<AiFillFacebook size="35px" />}
          />
        </CustomChakraNextLink>

        <CustomChakraNextLink href="https://instagram.com/aaafuria">
          <IconButton
            aria-label="Instagram"
            colorScheme="green"
            variant="ghost"
            icon={<AiFillInstagram size="35px" />}
          />
        </CustomChakraNextLink>
        <CustomChakraNextLink href="https://twitter.com/Aaafuria">
          <IconButton
            aria-label="Twitter"
            colorScheme="green"
            variant="ghost"
            icon={<AiFillTwitterSquare size="35px" />}
          />
        </CustomChakraNextLink>
        <CustomChakraNextLink href="#">
          <IconButton
            aria-label="TikTok"
            colorScheme="green"
            variant="ghost"
            icon={<FaTiktok size="35px" />}
            isDisabled
          />
        </CustomChakraNextLink>
      </HStack>
    </Box>
  );
};
