/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from '../ui/card'
import { Download, EllipsisVertical, FileText, Image, ShieldAlert, Trash, Youtube } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import SendFile from '../send/SendFile'
import { Button } from '../ui/button'

type Props = {
    folders: any[]
}

const List = ({ folders }: Props) => {
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const [newSend, setNewSend] = useState<any>({
        email: '',
        file: {},
        createdAt: Date.now().toString()
    })
    console.log(folders);
    const handleDelete = (id: string, i: string) => {
        console.log(id, i);

        const updateFiles = folders.map((x: any) => {
            if (x.id == id) {
                x.files.splice(i, 1)
            }
            return x
        })
        localStorage.setItem('folders', JSON.stringify(updateFiles));
    }

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>#</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        folders?.map((z: any) =>
                            z.files.map((y: any, i: string) => (
                                <TableRow key={i}>
                                    <TableCell className='line-clamp-2'>{y.name.length > 50 ? y.name.slice(0, 30) : y.name}</TableCell>
                                    <TableCell>{y?.type?.includes('image') ? <Image className={`w-10 h-10 p-2 text-green-600 rounded bg-green-100 `} /> : y?.type?.includes('text') || y?.type?.includes('application') ? <FileText className={`w-10 h-10 p-2 text-yellow-600 rounded bg-yellow-100 `} /> : y?.type?.includes('video') ? <Youtube className={`w-10 h-10 p-2 text-blue-600 rounded bg-blue-100 `} /> : <ShieldAlert className={`text-red-600 p-2 w-10 h-10 rounded bg-red-100 `} />}</TableCell>
                                    <TableCell>{(y?.size / Math.pow(1024, 2)).toFixed(2)} MB</TableCell>
                                    <TableCell>{y?.createdAt ? y?.createdAt?.toString()?.slice(0, 15) : ''}</TableCell>
                                    <TableCell>
                                        <DropdownMenu >
                                            <DropdownMenuTrigger>
                                                <EllipsisVertical />
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent className="  bg-stone-700 flex flex-col items-center mx-auto shadow-xl rounded-lg">

                                                <SendFile open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen} setNewSend={setNewSend} newSend={newSend} index={Number(i)} folders={folders} />


                                                <hr className='w-full border-1 border-gray-900' />

                                                <Button variant="outline" className="w-full justify-start gap-2">
                                                    <Download className=" h-6 w-6 text-green-500" />

                                                </Button>
                                                <hr className='w-full border-1 border-gray-900' />
                                                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => handleDelete(z.id, i)} >
                                                    <Trash className=" h-6 w-6 tfont-bold text-red-500" />

                                                </Button>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </Card>
    )
}

export default List