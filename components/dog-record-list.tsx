"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useDogRecords } from "@/hooks/use-dog-records"
import type { DogRecord } from "@/types/dog-record"

export function DogRecordList() {
  const { records } = useDogRecords()
  const [sortedRecords, setSortedRecords] = useState<DogRecord[]>([])

  useEffect(() => {
    // 日付の新しい順に並べ替え
    const sorted = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setSortedRecords(sorted)
  }, [records])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (sortedRecords.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <p className="text-gray-500">まだ記録がありません。「新しい記録を追加」から記録を始めましょう！</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {sortedRecords.map((record) => (
        <Link href={`/record/${record.id}`} key={record.id}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image src={record.photoUrl || "/placeholder.svg"} alt="愛犬の写真" fill className="object-cover" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(record.date)}
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-gray-500">体重</p>
                    <p className="font-medium">{record.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">身長</p>
                    <p className="font-medium">{record.height} cm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
