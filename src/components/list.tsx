'use client'

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image}  from "@nextui-org/react";
import NextLink from "next/link";

type ListProps = {
    data: Record<string, never>[]
}

export const List = ({ data }: ListProps) => {


    return data ? (
        <div className={'grid gap-2 max-w-[640px]'}>
            {
                data.map(song => (
                    <Card key={song.id} className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">{song.authorName}</p>
                                <p className="text-small text-default-500">{song.songName}</p>
                            </div>
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                            <p>{song.content}</p>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <Link
                                as={NextLink}
                                showAnchorIcon
                                href={`/list/${song.id}`}
                            >
                                Check chord for this song
                            </Link>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
        ) : null
}