"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Edit, Ruler, Weight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDogRecords } from "@/hooks/use-dog-records"
import type { DogRecord } from "@/types/dog-record"

export default function RecordDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getRecordById } = useDogRecords()
  const [record, setRecord] = useState<DogRecord | null>(null)

  useEffect(() => {
    const foundRecord = getRecordById(params.id)
    if (foundRecord) {
      setRecord(foundRecord)
    } else {
      router.push("/")
    }
  }, [params.id, getRecordById, router])

  if (!record) {
    return <div className="container mx-auto py-8 px-4">読み込み中...</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        戻る
      </Button>

      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <div className="relative aspect-square rounded-lg overflow-hidden border">
          <Image src={record.photoUrl || "/placeholder.svg"} alt="愛犬の写真" fill className="object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-sky-700 mb-2">{formatDate(record.date)}の記録</h1>
            <Button
              variant="outline"
              size="sm"
              className="text-gray-500"
              onClick={() => router.push(`/edit-record/${record.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center">
                <Weight className="h-5 w-5 mr-3 text-sky-600" />
                <div>
                  <p className="text-sm text-gray-500">体重</p>
                  <p className="text-xl font-semibold">{record.weight} kg</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center">
                <Ruler className="h-5 w-5 mr-3 text-sky-600" />
                <div>
                  <p className="text-sm text-gray-500">身長</p>
                  <p className="text-xl font-semibold">{record.height} cm</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                <p className="text-sm text-gray-500">メモ</p>
              </div>
              <p className="whitespace-pre-line">{record.notes || "メモはありません"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
