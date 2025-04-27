"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { DogRecord } from "@/types/dog-record"

// サンプルデータ
const initialRecords: DogRecord[] = [
  {
    id: "1",
    date: "2023-04-15",
    weight: 4.2,
    height: 28.5,
    notes: "今日は元気いっぱい！散歩で新しい友達ができました。",
    photoUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    date: "2023-05-20",
    weight: 5.1,
    height: 30.2,
    notes: "ワクチン接種に行きました。とても勇敢でした！",
    photoUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    date: "2023-06-25",
    weight: 5.8,
    height: 32.0,
    notes: "新しいおもちゃが大好きです。よく遊んでいます。",
    photoUrl: "/placeholder.svg?height=200&width=200",
  },
]

type DogRecordsContextType = {
  records: DogRecord[]
  addRecord: (record: DogRecord) => void
  updateRecord: (id: string, updatedRecord: Partial<DogRecord>) => void
  deleteRecord: (id: string) => void
  getRecordById: (id: string) => DogRecord | undefined
}

const DogRecordsContext = createContext<DogRecordsContextType | undefined>(undefined)

export function DogRecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<DogRecord[]>([])

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    const savedRecords = localStorage.getItem("dogRecords")
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords))
    } else {
      // 初回はサンプルデータを使用
      setRecords(initialRecords)
      localStorage.setItem("dogRecords", JSON.stringify(initialRecords))
    }
  }, [])

  // データが変更されたらローカルストレージに保存
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("dogRecords", JSON.stringify(records))
    }
  }, [records])

  const addRecord = (record: DogRecord) => {
    setRecords((prev) => [...prev, record])
  }

  const updateRecord = (id: string, updatedRecord: Partial<DogRecord>) => {
    setRecords((prev) => prev.map((record) => (record.id === id ? { ...record, ...updatedRecord } : record)))
  }

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id))
  }

  const getRecordById = (id: string) => {
    return records.find((record) => record.id === id)
  }

  return (
    <DogRecordsContext.Provider
      value={{
        records,
        addRecord,
        updateRecord,
        deleteRecord,
        getRecordById,
      }}
    >
      {children}
    </DogRecordsContext.Provider>
  )
}

export function useDogRecords() {
  const context = useContext(DogRecordsContext)
  if (context === undefined) {
    throw new Error("useDogRecords must be used within a DogRecordsProvider")
  }
  return context
}
