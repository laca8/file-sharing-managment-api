/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FolderPlus } from "lucide-react";
type Folder = {
    id: string,
    name: string,
    maxSize: number,
    files: [],
    size: number
}
type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    newFolder: {
        name: string,
        maxSize: number,
        files: [],
        id: string;
        size: number;

    },
    setNewFolder: (newFolder: {
        name: string,
        maxSize: number,
        size: number;
        files: [],
        id: string
    }) => void;
    folders: Folder[];
    setFolders: (folders: Folder[]) => void;

}
const FolderForm = ({ open, onOpenChange, setNewFolder, newFolder, folders, setFolders }: Props) => {
    const handleChange = (name: string, value: string) => {
        setNewFolder({
            ...newFolder,
            [name]: value
        })
    }
    const handleSubmit = () => {
        console.log(newFolder)
        const newFolders = [...folders, newFolder];
        localStorage.setItem('folders', JSON.stringify(newFolders));
        setFolders(newFolders);

    }
    return (
        <div className=''>

            <Button onClick={() => onOpenChange(!open)} variant="outline" className="w-full justify-start gap-2" >
                <FolderPlus className="h-4 w-4" />
                Create Folder
            </Button>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className='text-center text-6xl'>📁</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">

                        <div>
                            <label htmlFor="requester-name">Folder Name</label>
                            <Input
                                id="name"
                                placeholder="Type here ..."
                                className="mt-1.5"
                                name='name'
                                onChange={(e) => handleChange('name', e.target.value)}

                            />
                        </div>

                        <Button className="w-full" onClick={() => handleSubmit()}>New Folder</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FolderForm;