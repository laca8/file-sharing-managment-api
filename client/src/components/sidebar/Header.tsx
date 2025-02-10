import { Search } from 'lucide-react'
import { Input } from '../ui/input'

const Header = () => {
    const email = localStorage.getItem('email')
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="relative w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="text-sm">
                        <div className="text-muted-foreground text-md text-white font-medium shadow-md rounded-md p-2 border-2 border-blue-600 bg-blue-600">{email}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header