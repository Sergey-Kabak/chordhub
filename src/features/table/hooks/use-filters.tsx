'use client'

import {
  RegisteredRouter,
  RouteIds,
} from '@tanstack/react-router'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useMemo } from "react";

export const buildQueryString = (obj: any) => {
  const queryString = Object.keys(obj)
    .filter((key) => obj[key] !== "" && obj[key] !== undefined && obj[key] !== null)
    .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return queryString;
};

export function useFilters<T extends RouteIds<RegisteredRouter['routeTree']>>(
  routeId: T
) {

  const router = useRouter()
  const searchParams = useSearchParams();
  const params: { [anyProp: string]: string } = {};
  const pathname = usePathname();

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  //

  const filters = useMemo(() => {
    return params
  }, [params])

  const setFilters = (partialFilters: Partial<typeof filters>) => {
    return router.push(`${pathname}?${buildQueryString({...params, ...partialFilters})}`)
  }
  const resetFilters = () => router.push(pathname)

  return { filters, setFilters, resetFilters }
}
