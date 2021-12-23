import CadastroDrawer from '@/components/CadastroDrawer';
import { Card } from '@/components/Card';
import CustomButtom from '@/components/CustomButtom';
import Layout from '@/components/Layout';
import PageHeading from '@/components/PageHeading';
import { AuthContext } from '@/contexts/AuthContext';
import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Center,
  chakra,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useCallback, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillHome } from 'react-icons/ai';
import { MdLogin } from 'react-icons/md';

const QUERY = gql`
  query BuscarSocio($username: String!) {
    allSocio(user_Username: $username) {
      edges {
        node {
          nome
        }
      }
    }
  }
`;

type Inputs = {
  matricula: string;
  pin: string;
};

export default function Entrar() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { signIn, signOut } = useContext(AuthContext);
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const [entrar, setEntrar] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [matricula, setMatricula] = React.useState('');
  const [errorMesage, setErrorMesage] = React.useState('');

  const toast = useToast();

  const ChakraNextImage = chakra(Image);

  const formValues = getValues();

  const query = useQuery(QUERY, {
    variables: { username: formValues.matricula || '' },
    fetchPolicy: 'no-cache',
  });

  const handleReset = useCallback(() => {
    localStorage.removeItem('aaafuria@signUpMatricula');
    setEntrar(false);
    setMatricula('');
    setErrorMesage('');
  }, []);

  useEffect(() => {
    if (matricula.length < 8) {
      setEntrar(false);
      setErrorMesage('');
    }
  }, [matricula]);

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    ({ matricula: mtr, pin }) => {
      setLoading(true);

      const { after }: { after?: string } = router.query;

      if (entrar) {
        signIn({ matricula: mtr, pin, redirectUrl: after }).catch((err) => {
          setErrorMesage(err.message);
          signOut();
        });
      }

      if (mtr.length === 8) {
        query.refetch({ username: mtr });

        if (query?.data?.allSocio?.edges?.length === 0) {
          setEntrar(false);
          localStorage.setItem('aaafuria@signUpMatricula', mtr);
          toast({
            description: 'Matrícula não encontrada. Cadastre-se!',
            status: 'info',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
          onOpen();
        } else {
          setEntrar(true);
        }
      } else {
        setEntrar(false);
        signOut();
        setErrorMesage('Matrícula inválida');
      }

      setLoading(false);
    },
    [entrar, onOpen, query, router.query, signIn, signOut, toast],
  );

  return (
    <Layout title="Entrar" desc="Acesse a plataforma de Sócios da @aaafuria!">
      <Box maxW="md" mx="auto">
        <Center>
          <Box boxSize="250px" position="relative">
            <ChakraNextImage
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              src="/calango-verde.png"
              quality={1}
              alt="logo"
              mx="auto"
              mb={{ base: '8', md: '12' }}
            />
          </Box>
        </Center>
        <PageHeading>Acesse a plataforma</PageHeading>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} name="entrarForm">
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Matrícula: </FormLabel>
                <HStack>
                  <Input type="hidden" {...register('matricula')} />
                  <PinInput
                    size="lg"
                    focusBorderColor="green.500"
                    value={matricula}
                    onChange={(value) => {
                      setValue('matricula', value);
                      setMatricula(value);
                    }}
                    placeholder=""
                    autoFocus
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </FormControl>
              {entrar && (
                <FormControl>
                  <FormLabel>PIN: </FormLabel>
                  <HStack>
                    <Input type="hidden" {...register('pin')} />
                    <PinInput
                      size="lg"
                      mask
                      focusBorderColor="green.500"
                      onChange={(value) => setValue('pin', value)}
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </FormControl>
              )}
              {errorMesage && (
                <Text textAlign="center" textColor="gray.500">
                  <i>{errorMesage}</i>
                </Text>
              )}
              <Stack>
                <CustomButtom
                  leftIcon={<MdLogin size="20px" />}
                  mt={4}
                  isLoading={loading}
                  type="submit"
                >
                  Entrar
                </CustomButtom>
                <CustomButtom
                  leftIcon={<AiFillHome size="20px" />}
                  colorScheme="gray"
                  onClick={() => router.push('/')}
                >
                  Início
                </CustomButtom>
              </Stack>
            </Stack>
          </form>
        </Card>
        <Center mt={2}>
          <Text as="i" textAlign="center" maxW="md" fontWeight="light">
            *Em caso de erro atualize a página.
          </Text>
        </Center>
      </Box>
      <CadastroDrawer
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleReset();
        }}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['aaafuriaToken']: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
