/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MailCheck, Share2Icon } from "lucide-react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    newSend: any,
    setNewSend: (newSend: any) => void
    index: number,
    folders: any[]

}
const FolderForm = ({ open, onOpenChange, newSend, setNewSend, index, folders }: Props) => {
    const handleChange = (name: string, value: string) => {
        setNewSend({
            ...newSend,
            [name]: value
        })
    }
    const handleSubmit = () => {
        console.log(newSend)
        folders[0].files.map((x: any, i: number) => {
            if (i == index) {
                newSend.file = x


            }
        })

        console.log(index);
    }
    return (
        <div className=''>

            <Button onClick={() => onOpenChange(!open)} variant="outline" className="w-full justify-start gap-2" >
                <Share2Icon className="h-4 w-4" />

            </Button>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className='text-center text-6xl flex items-center mx-auto'>
                            <MailCheck className='w-16 h-16 text-blue-600 shadow-md' />
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">

                        <div>
                            <label htmlFor="Email">Email</label>
                            <Input
                                id="email"
                                placeholder="Type here ..."
                                className="mt-1.5"
                                name='email'
                                onChange={(e) => handleChange('email', e.target.value)}

                            />
                        </div>

                        <Button className="w-full" onClick={() => handleSubmit()}>Send</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FolderForm;