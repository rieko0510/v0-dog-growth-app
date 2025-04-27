"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDogRecords } from "@/hooks/use-dog-records"

export default function AddRecordPage() {
  const router = useRouter()
  const { addRecord } = useDogRecords()
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addRecord({
      id: Date.now().toString(),
      date,
      weight: Number.parseFloat(weight),
      height: Number.parseFloat(height),
      notes,
      photoUrl: "/placeholder.svg?height=200&width=200",
    })

    router.push("/")
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        戻る
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-sky-700">新しい成長記録を追加</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">日付</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="weight">体重 (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="5.2"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="height">身長 (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="30.5"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="photo">写真</Label>
                <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-gray-500">
                  <Camera className="h-8 w-8 mb-2" />
                  <p>写真をアップロード</p>
                  <p className="text-xs mt-1">（クリックまたはドラッグ＆ドロップ）</p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">メモ</Label>
                <Textarea
                  id="notes"
                  placeholder="今日の様子や特記事項を記入してください"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
              記録を保存
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
