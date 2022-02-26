import { AiFillHome, AiOutlineInbox } from 'react-icons/ai';
import {
  Box,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  ColorModeToggle,
  CustomButtom,
  CustomChakraNextLink,
  CustomIconButton,
  NotificationBadge,
} from '@/components/atoms';
import { gql, useQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from 'nookies';

const GET_SOCIO = gql`
  query {
    socioAutenticado {
      matricula
      conta {
        calangos
      }
    }
  }
`;

export const Header = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const green = useColorModeValue('green.600', 'green.200');
  const { isAuthenticated, isSocio, checkCredentials } =
    useContext(AuthContext);
  const { data, refetch } = useQuery(GET_SOCIO, {
    context: {
      headers: {
        authorization: `JWT ${parseCookies()['aaafuriaToken']}`,
      },
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    refetch();
    checkCredentials();
  }, [checkCredentials, refetch]);
  return (
    <Flex justify="space-between" bg={bg} py="2" px={{ base: '4', lg: '8' }}>
      <CustomChakraNextLink href="/">
        <CustomIconButton
          aria-label="início"
          icon={<AiFillHome size="20px" />}
        />
      </CustomChakraNextLink>
      {!data ? (
        <Spinner color="green" size="sm" />
      ) : (
        isAuthenticated &&
        isSocio && (
          <CustomChakraNextLink href="/areasocio/carteira">
            <CustomButtom flexDir="column" textColor={green} w="initial">
              <HStack>
                <Image
                  src={`${process.env.PUBLIC_AWS_URI}/calango-verde.png`}
                  boxSize="15px"
                  alt="calangos"
                />
                <Text fontSize="sm">
                  {data?.socioAutenticado?.conta.calangos}
                </Text>
              </HStack>
            </CustomButtom>
          </CustomChakraNextLink>
        )
      )}
      <HStack>
        <CustomChakraNextLink href="/arquivos">
          <CustomIconButton
            aria-label="files"
            icon={
              <Box position="relative">
                <NotificationBadge />
                <AiOutlineInbox size="25px" />
              </Box>
            }
          />
        </CustomChakraNextLink>
        <ColorModeToggle />
      </HStack>
    </Flex>
  );
};
