'use client'

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image}  from "@nextui-org/react";

export const List = ({ data }: { data : Record<string, any>}) => {


    return data ? (
        <div className={'grid gap-2 max-w-[640px]'}>
            {
                data.map((song, index) => (
                    <Card key={index} className="max-w-[400px]">
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
                                isExternal
                                showAnchorIcon
                                href="https://github.com/nextui-org/nextui"
                            >
                                Visit source code on GitHub.
                            </Link>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
        ) : null
}