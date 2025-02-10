/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button } from '../ui/button'
import { Folders, SquareSigma, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FolderForm from '../../pages/file-share/Form'
type Folder = {
    id: string,
    name: string,
    files: [],
    maxSize: number,
    size: number

}
type Props = {
    folders: Folder[],
    setFolders: (folders: Folder[]) => void
}

const Sidebar = ({ folders, setFolders }: Props) => {
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const [newFolder, setNewFolder] = useState<Folder>({
        name: '',
        files: [],
        maxSize: Number(100) / Number(folders.length),
        size: Number(0),
        id: `${Date.now()}`
    })
    const navigator = useNavigate()

    return (
        <aside className="w-64 p-4 border-r">
            <div className="flex items-center gap-2 mb-6">
                <img
                    src="https://cdn-icons-png.freepik.com/256/12105/12105601.png?semt=ais_hybrid"
                    alt="Cloud"
                    className="h-10 w-10"
                />
                <h1 className="text-xl text-blue-600 border-b-8 border-blue-600 font-medium">Cloud Files</h1>
            </div>
            <hr className='border-1 border-black' />
            <div className="space-y-2 mb-6 mt-4">
                <FolderForm setNewFolder={setNewFolder} newFolder={newFolder} setFolders={setFolders} folders={folders} open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen} />
            </div>
            <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { navigator('/share') }}>
                    <Folders className="h-4 w-4" />
                    My Folders
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { }}>
                    <SquareSigma className="h-4 w-4" />
                    Recieving
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { }}>
                    <Trash2 className="h-4 w-4" />
                    Trash
                </Button>
            </nav>
        </aside>
    )
}

export default Sidebar