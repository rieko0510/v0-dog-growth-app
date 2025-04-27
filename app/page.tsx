import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DogRecordList } from "@/components/dog-record-list"
import { DogStats } from "@/components/dog-stats"

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-sky-700 mb-2">わんちゃん成長記録</h1>
        <p className="text-gray-600">愛犬の成長を記録して、大切な思い出を残しましょう</p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <main>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">最近の記録</h2>
            <Link href="/add-record">
              <Button className="bg-sky-600 hover:bg-sky-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                新しい記録を追加
              </Button>
            </Link>
          </div>
          <DogRecordList />
        </main>

        <aside className="space-y-6">
          <DogStats />
        </aside>
      </div>
    </div>
  )
}
