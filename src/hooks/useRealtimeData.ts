import { useEffect, useState } from 'react'
import { supabase, subscribeToTable, RealtimeCallback } from '@/lib/supabase/client'

export function useRealtimeData<T>(
  table: string,
  initialData: T[] = [],
  filter?: string
) {
  const [data, setData] = useState<T[]>(initialData)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial data fetch
    const fetchData = () => {
      supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            setError(error)
          } else {
            setData(data as T[])
          }
          setLoading(false)
        })
    }

    fetchData()

    // Set up real-time subscription
    const callback: RealtimeCallback<T> = ({ new: newRecord, old: oldRecord, eventType }) => {
      setData((currentData) => {
        switch (eventType) {
          case 'INSERT':
            return [newRecord as T, ...currentData]
          case 'UPDATE':
            return currentData.map((item) =>
              (item as any).id === (newRecord as any).id ? (newRecord as T) : item
            )
          case 'DELETE':
            return currentData.filter((item) => (item as any).id !== (oldRecord as any).id)
          default:
            return currentData
        }
      })
    }

    const unsubscribe = subscribeToTable<T>(table, callback, filter)

    // Cleanup subscription on unmount
    return () => {
      unsubscribe()
    }
  }, [table, filter])

  return { data, error, loading }
} 