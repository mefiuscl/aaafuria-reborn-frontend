import React from 'react';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { CustomButtom, CustomChakraNextLink } from '@/components/atoms';
import { Divider, Stack, StackProps } from '@chakra-ui/react';
import { MdStore } from 'react-icons/md';

export type AreaDiretorMenuProps = StackProps;

export const AreaDiretorMenu = ({ ...rest }: AreaDiretorMenuProps) => {
  return (
    <Stack {...rest}>
      <CustomChakraNextLink href="/areadiretor/plantao">
        <CustomButtom leftIcon={<MdStore size="20px" />}>Plantão</CustomButtom>
      </CustomChakraNextLink>
      <CustomChakraNextLink
        chakraLinkProps={{
          target: '_blank',
        }}
        href="https://aaafuria-reborn.herokuapp.com/admin"
      >
        <CustomButtom
          leftIcon={<AiFillSetting size="20px" />}
          colorScheme="yellow"
          hasExternalIcon
        >
          Painel
        </CustomButtom>
      </CustomChakraNextLink>

      <Divider height="15px" />

      <CustomChakraNextLink href="/">
        <CustomButtom leftIcon={<AiFillHome size="20px" />} colorScheme="red">
          Voltar
        </CustomButtom>
      </CustomChakraNextLink>
    </Stack>
  );
};
