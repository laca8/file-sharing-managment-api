/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"

import { FileIcon } from "lucide-react"

import Size from '../../components/size/Size'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/sidebar/Header'
import List from '../../components/files/List'

type Folder = {
    id: string,
    name: string,
    files: [],
    maxSize: number,
    size: number

}


const Folder = () => {
    const [folders, setFolders] = useState<Folder[]>(JSON.parse(localStorage.getItem('folders') || '[]'))
    const { name } = useParams()
    const [file, setFile] = useState<File | null>(null)
    console.log(file);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
        if (file) {
            const newFile = {
                id: Math.random().toString(),
                name: file.name,
                type: file.type,
                size: file.size,
                createdAt: `${new Date()}`.toString(),
                permissions: { read: true, write: true, delete: true },
            }
            console.log(newFile);
            const updateFiles = folders.map((x: any) => {
                if (x.name == name) {
                    x.files.push(newFile)
                }
                return x
            })
            localStorage.setItem('folders', JSON.stringify(updateFiles));
        };
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar folders={folders} setFolders={setFolders} />

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header Content */}

                <Header />
                <div className='grid grid-cols-3 gap-4'>
                    {/* Recent Folders */}
                    <section className="mb-8 col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg bg-blue-600 p-2 text-white shadow-md rounded-lg"><span className='font-medium'>{name}</span> 📁</h2>
                        </div>
                        <Card className='p-2 flex flex-col items-center gap-4 mb-4'>
                            <label htmlFor="file" className="text-sm font-medium flex flex-col items-center gap-2">
                                <FileIcon className="w-12 h-12" />
                                <Input id="file" type="file" placeholder="File" accept="/*" className='hidden' onChange={handleFileChange} />
                                <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
                                <span className="text-xs text-gray-500">PDF, image, video, or audio</span>
                            </label>

                        </Card>
                        {/* Recent Folders */}
                        <List folders={folders?.filter((x: any) => x.name == name)} />
                    </section>
                    {/* Storage Overview */}

                    <Size folders={folders?.filter((x: any) => x.name == name)} />

                </div>
            </main >
        </div >
    )
}

export default Folder