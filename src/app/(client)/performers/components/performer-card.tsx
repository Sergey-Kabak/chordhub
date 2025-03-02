'use client'

import NextLink from "next/link";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import { PerformerType } from "@/types/performer.ts";
import NextImage from "next/image";

export const PerformerCard = ({ performer } : { performer?: PerformerType }) => {
  return (
    <Card className="py-4" as={NextLink} href={`/performers/${performer?.id}`}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <small className="font-bold text-sm">{performer?.name}</small>
        <small className="text-default-500">{performer?.songs?.[0]?.count} Tracks</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={performer?.image}
        />
      </CardBody>
    </Card>
  )
}