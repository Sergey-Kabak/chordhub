'use client';

import React, { ReactNode } from 'react';
import Sidebar from '@/components/sidebar/sidebar.tsx';
import { Header } from '@/components/layout/header.tsx';
import {
  Accordion,
  AccordionItem,
  Link,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Kbd,
} from '@heroui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useHotkeys } from 'react-hotkeys-hook';

type Link = {
  title: string;
  icon?: ReactNode;
  pages: {
    label: string;
    link: string;
  }[];
};

export default function DefaultLayout({ children, links, isDashboard = false }: { children: ReactNode; links: Link[], isDashboard?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  useHotkeys(
    'Meta+k',
    () => {
      onOpen();
    },
    [],
  );

  return (
    <>
      <Header openSearch={onOpen} />
      <main className={'relative container mx-auto max-w-8xl z-10 px-6 min-h-[calc(100dvh_-_65px)] flex-grow'}>
        <div className={'grid grid-cols-12 min-h-[inherit]'}>
          <div className={'hidden overflow-visible relative z-10 lg:block lg:col-span-2 pt-6 pr-4 border-r-1'}>
            <Sidebar>
              <Sidebar.Body>
                <Accordion
                  isCompact={true}
                  defaultSelectedKeys={'all'}
                  className={'px-0'}
                  selectionMode={'multiple'}
                  showDivider={false}
                >
                  {links.map((link, index) => (
                    <AccordionItem
                      key={index}
                      aria-label={`Accordion ${index}`}
                      startContent={link?.icon || ''}
                      title={link.title}
                      classNames={{
                        titleWrapper: 'flex-[0]',
                        title: 'text-sm font-normal whitespace-nowrap',
                      }}
                    >
                      <ul className={'grid gap-5 py-2'}>
                        {link.pages.map((page, pageIndex) => (
                          <li
                            key={`${index}_${pageIndex}`}
                            className={
                              "relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity w-full before:mr-8 before:content-[''] before:block before:bg-default-300 before:w-1 before:h-1 before:rounded-full"
                            }
                          >
                            <Link
                              size={'sm'}
                              color={pathname === page.link ? 'primary' : 'foreground'}
                              as={NextLink}
                              href={page.link}
                            >
                              {page.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Sidebar.Body>
            </Sidebar>
          </div>
          <div className={'col-span-12 lg:col-span-10 xl:col-span-10 py-6 pl-6'}>{children}</div>
        </div>
      </main>

      <Modal size={'xl'} backdrop={'blur'} isOpen={isOpen} onClose={onClose} closeButton={null}>
        <ModalContent className={'bg-default-100'}>
          {(onClose) => (
            <>
              <ModalHeader className="py-0 px-0">
                <Input
                  size={'lg'}
                  placeholder={'Search documentation'}
                  classNames={{
                    inputWrapper: 'rounded-b-none',
                    input: 'font-thin',
                  }}
                  endContent={<Kbd>esc</Kbd>}
                  startContent={
                    <svg
                      aria-hidden="true"
                      fill="none"
                      focusable="false"
                      height="24"
                      role="presentation"
                      viewBox="0 0 24 24"
                      width="24"
                      className="text-default-400 text-lg"
                    >
                      <path
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M22 22L20 20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  }
                />
              </ModalHeader>
              <ModalBody>
                <div className={'py-12 text-center'}>No recent searches</div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
