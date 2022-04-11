import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { ICard } from './ICard';

export const Card = ({ children, variant, ...rest }: ICard) => {
  const bg = useColorModeValue('white', 'gray.800');
  const greenBg = useColorModeValue('green.50', 'green.900');
  const redBg = useColorModeValue('red.50', 'red.700');
  const green = useColorModeValue('green.500', 'green.800');
  const red = useColorModeValue('red.600', 'red.200');
  if (variant === 'error') {
    return (
      <Box
        bg={redBg}
        py="8"
        px={{ base: '4', md: '10' }}
        shadow="base"
        rounded={{ base: 'md', sm: 'lg' }}
        borderWidth="1px"
        borderColor={red}
        {...rest}
      >
        {children}
      </Box>
    );
  }
  if (variant === 'success') {
    return (
      <Box
        bg={greenBg}
        py="8"
        px={{ base: '4', md: '10' }}
        shadow="base"
        rounded={{ base: 'md', sm: 'lg' }}
        borderWidth="1px"
        borderColor={green}
        {...rest}
      >
        {children}
      </Box>
    );
  }
  return (
    <Box
      bg={bg}
      py="8"
      px={{ base: '4', md: '10' }}
      shadow="base"
      rounded={{ base: 'md', sm: 'lg' }}
      {...rest}
    >
      {children}
    </Box>
  );
};
