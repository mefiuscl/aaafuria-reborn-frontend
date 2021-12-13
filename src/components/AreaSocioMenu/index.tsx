import CustomButtom from '../CustomButtom';
import CustomChakraNextLink from '../CustomChakraNextLink';
import React from 'react';
import { AiFillHome, AiFillIdcard } from 'react-icons/ai';
import { Box, Divider, Stack, StackProps } from '@chakra-ui/react';
import { FaDrum, FaVolleyballBall } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md';

interface AreaSocioMenuProps extends StackProps {
  handleAssociacao: () => void;
}

function AreaSocioMenu({ handleAssociacao, ...rest }: AreaSocioMenuProps) {
  return (
    <Stack {...rest}>
      <CustomChakraNextLink href="/carteirinha">
        <CustomButtom leftIcon={<AiFillIdcard size="20px" />}>
          Carteirinha
        </CustomButtom>
      </CustomChakraNextLink>
      <CustomChakraNextLink href="/areasocio/atividades">
        <CustomButtom
          leftIcon={
            <>
              <FaVolleyballBall size="20px" />
              <Box ml={2} />
              <FaDrum size="20px" />
            </>
          }
        >
          Atividades
        </CustomButtom>
      </CustomChakraNextLink>
      <Divider height="15px" />
      <CustomButtom
        leftIcon={<MdManageAccounts size="20px" />}
        hasExternalIcon
        colorScheme="yellow"
        onClick={handleAssociacao}
      >
        Gerenciar associação
      </CustomButtom>
      <CustomChakraNextLink href="/">
        <CustomButtom leftIcon={<AiFillHome size="20px" />} colorScheme="gray">
          Voltar ao início
        </CustomButtom>
      </CustomChakraNextLink>
    </Stack>
  );
}

export default AreaSocioMenu;
