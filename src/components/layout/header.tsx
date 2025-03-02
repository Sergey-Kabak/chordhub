'use client'

import {Button, Kbd, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Divider} from "@heroui/react";
import NextLink from 'next/link'
import {Search} from "./search.tsx";
import {usePathname} from "next/navigation";

export const Header = ({ openSearch = () => {} }: { openSearch?: () => v }) => {
    const pathname = usePathname();
    return (
        <Navbar isBordered classNames={{
            wrapper: '!container'
        }}>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link color="foreground" as={NextLink} href="/">Diez</Link >
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                {/*<Search/>*/}
                <Button
                    onPress={openSearch}
                    variant={'bordered'}
                    radius="full"
                    color="default"
                    startContent={
                        <svg aria-hidden="true" fill="none" focusable="false" height="16" role="presentation"
                             viewBox="0 0 24 24" width="16"
                             className="text-base text-default-400 pointer-events-none flex-shrink-0" tabIndex="-1">
                            <path
                                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2"></path>
                            <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2"></path>
                        </svg>
                    }
                    endContent={
                        <Kbd keys={["command"]}>K</Kbd>
                    }
                    className={'text-foreground/50'}
                >
                    Search
                </Button>
            </NavbarContent>
        </Navbar>
    )
}