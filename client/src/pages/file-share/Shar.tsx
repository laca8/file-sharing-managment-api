import { useEffect, useState } from 'react'
import { Button } from "../../components/ui/button"

import { Card } from "../../components/ui/card"

import { useNavigate } from 'react-router-dom'
import Size from '../../components/size/Size'
import Header from '../../components/sidebar/Header'
import Sidebar from '../../components/sidebar/Sidebar'
type Folder = {
  maxSize: number,
  size: number,
  id: string,
  name: string,
  files: []

}
const Shar = () => {
  const [folders, setFolders] = useState<Folder[]>(JSON.parse(localStorage.getItem('folders') || '[]'))

  const navigator = useNavigate()
  const initialFolders: Folder[] = [



  ]

  useEffect(() => {
    if (!localStorage.getItem('folders') || JSON.parse(localStorage.getItem('folders') || '[]')?.length == 0) {
      localStorage.setItem('folders', JSON.stringify(initialFolders))
    }
    setFolders(JSON.parse(localStorage.getItem('folders') || '[]'))
  }, [folders, initialFolders])
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar folders={folders} setFolders={setFolders} />
      {/* Main Content */}
      <main className="flex-1 p-6">

        <Header />
        <div className='grid grid-cols-3 gap-4'>

          {/* Recent Folders */}
          <section className="mb-8 col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Folders</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {folders?.map((folder) => (
                <Card key={folder.id} className="p-4 cursor-pointer hover:bg-accent" onClick={() => navigator(`/share/${folder.name}`)}>
                  <div className="flex items-center gap-2">
                    <div className="text-yellow-500">📁</div>
                    <span>{folder.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Storage Overview */}

          <Size folders={folders} />


        </div>
      </main>
    </div>
  )
}

export default Shar