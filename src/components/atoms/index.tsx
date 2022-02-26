import { AreaDiretorButtonProps } from './AreaDiretorButton';
import { AtividadesSocioTableRowProps } from './AtividadesSocioTableRow';
import { CarteirinhaInputProps } from './CarteirinhaInput';
import { CustomButtomProps } from './CustomButton';
import { CustomChakraNextLinkProps } from './CustomChakraNextLink';
import { CustomIconButtonProps } from './CustomIconButton';
import { FloatingCarrinhoPlantaoButtonProps } from './FloatingCarrinhoPlantaoButton';
import { NotificationBadgeProps } from './NotificationBadge';
import { PageHeadingProps } from './PageHeading';
import { RefAttributes } from 'react';
import { SejaSocioButtonProps } from './SejaSocioButton';
import { VoltarButtonProps } from './VoltarButton';
import dynamic from 'next/dynamic';

export const Analytics = dynamic<any>(() =>
  import('./Analytics').then((mod) => mod.Analytics),
);
export const ColorModeToggle = dynamic<any>(() =>
  import('./ColorModeToggle').then((mod) => mod.ColorModeToggle),
);
export const AreaDiretorButton = dynamic<AreaDiretorButtonProps>(() =>
  import('./AreaDiretorButton').then((mod) => mod.AreaDiretorButton),
);
export const AtividadesSocioTableRow = dynamic<AtividadesSocioTableRowProps>(
  () =>
    import('./AtividadesSocioTableRow').then(
      (mod) => mod.AtividadesSocioTableRow,
    ),
);
export const CarteirinhaInput = dynamic<CarteirinhaInputProps>(() =>
  import('./CarteirinhaInput').then((mod) => mod.CarteirinhaInput),
);
export const CustomButtom = dynamic<
  CustomButtomProps & RefAttributes<HTMLButtonElement>
>(() => import('./CustomButton').then((mod) => mod.CustomButton));

export const CustomIconButton = dynamic<
  CustomIconButtonProps & RefAttributes<HTMLButtonElement>
>(() => import('./CustomIconButton').then((mod) => mod.CustomIconButton));

export const CustomChakraNextLink = dynamic<CustomChakraNextLinkProps>(() =>
  import('./CustomChakraNextLink').then((mod) => mod.CustomChakraNextLink),
);

export const FloatingCarrinhoPlantaoButton =
  dynamic<FloatingCarrinhoPlantaoButtonProps>(() =>
    import('./FloatingCarrinhoPlantaoButton').then(
      (mod) => mod.FloatingCarrinhoPlantaoButton,
    ),
  );
export const NotificationBadge = dynamic<NotificationBadgeProps>(() =>
  import('./NotificationBadge').then((mod) => mod.NotificationBadge),
);

export const PageHeading = dynamic<PageHeadingProps>(() =>
  import('./PageHeading').then((mod) => mod.PageHeading),
);

export const SejaSocioButton = dynamic<SejaSocioButtonProps>(() =>
  import('./SejaSocioButton').then((mod) => mod.SejaSocioButton),
);
export const VoltarButton = dynamic<VoltarButtonProps>(() =>
  import('./VoltarButton').then((mod) => mod.VoltarButton),
);
