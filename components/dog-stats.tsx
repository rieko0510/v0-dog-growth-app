"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDogRecords } from "@/hooks/use-dog-records"

export function DogStats() {
  const { records } = useDogRecords()
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (records.length === 0) return

    // 日付順に並べ替え
    const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // チャート用のデータを作成
    const data = sortedRecords.map((record) => ({
      date: new Date(record.date).toLocaleDateString("ja-JP", { month: "short", day: "numeric" }),
      weight: record.weight,
      height: record.height,
    }))

    setChartData(data)
  }, [records])

  if (records.length < 2) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-sky-600" />
            成長グラフ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center py-6">2件以上の記録があると、成長グラフが表示されます</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-sky-600" />
          成長グラフ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="weight"
                name="体重 (kg)"
                stroke="#0284c7"
                activeDot={{ r: 8 }}
              />
              <Line yAxisId="right" type="monotone" dataKey="height" name="身長 (cm)" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
