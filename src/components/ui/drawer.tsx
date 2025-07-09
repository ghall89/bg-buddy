import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Drawer as DrawerRoot,
} from '@heroui/react';
import { ReactNode } from 'react';

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
  placement?: 'top' | 'right' | 'bottom' | 'left' | undefined;
  size?:
    | 'full'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | undefined;
  title?: string;
}

export default function Drawer({
  children,
  isOpen,
  onOpenChange,
  onClose = () => {},
  placement = 'left',
  size = 'full',
  title,
}: DrawerProps) {
  return (
    <DrawerRoot
      isOpen={isOpen}
      placement={placement}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size={size}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            {title && (
              <DrawerHeader className="flex flex-col gap-1">
                {title}
              </DrawerHeader>
            )}
            <DrawerBody>{children}</DrawerBody>
          </>
        )}
      </DrawerContent>
    </DrawerRoot>
  );
}
