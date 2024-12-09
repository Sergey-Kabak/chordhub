'use client'

import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Divider} from "@nextui-org/react";
import NextLink from 'next/link'
import {Search} from "./search.tsx";
import {usePathname} from "next/navigation";

export const Header = () => {
    const pathname = usePathname();
    return (
        <Navbar isBordered>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link color="foreground" as={NextLink} href="/">ChordHub</Link >
                </NavbarBrand>
                <NavbarContent as="div" className="sm:flex gap-3">
                    <NavbarItem isActive={pathname === '/list'}>
                        <Link color="foreground" as={NextLink} href="/performers">Performers</Link>
                    </NavbarItem>
                    <Divider orientation="vertical" />
                    <NavbarItem isActive={pathname === '/dashboard'}>
                        <Link color="foreground" as={NextLink} href="/dashboard">Dashboard (for moderation)</Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <Search/>
            </NavbarContent>
        </Navbar>
    )
}