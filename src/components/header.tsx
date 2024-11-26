'use client'

import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import NextLink from 'next/link'
import {Search} from "@/components/search.tsx";
import {usePathname} from "next/navigation";

export const Header = () => {
    const pathname = usePathname();
    return (
        <Navbar isBordered>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <p className="hidden sm:block font-bold text-inherit">Chord</p>
                </NavbarBrand>
                <NavbarContent as="div" className="sm:flex gap-3">
                    <NavbarItem isActive={pathname === '/'}>
                        <Link color="foreground" as={NextLink} href="/">Home</Link >
                    </NavbarItem>
                    <NavbarItem isActive={pathname === '/list'}>
                        <Link color="foreground" as={NextLink} href="/list">Songs</Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <Search/>
            </NavbarContent>
        </Navbar>
    )
}