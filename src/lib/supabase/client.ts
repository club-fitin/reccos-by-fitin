import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://femfancsggzrrwveqbhe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlbWZhbmNzZ2d6cnJ3dmVxYmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MjY2NDgsImV4cCI6MjA2MDAwMjY0OH0.rnAFLd0bk4-yM4PfaNmxNQQpPc26CSNM-4DaNPhNUrM'

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Real-time subscription types
export type RealtimeCallback<T> = (payload: {
  new: T | null
  old: T | null
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
}) => void

// Real-time subscription helper
export function subscribeToTable<T>(
  table: string,
  callback: RealtimeCallback<T>,
  filter?: string
) {
  const subscription = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table,
        filter
      },
      (payload) => {
        callback({
          new: payload.new as T,
          old: payload.old as T,
          eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE'
        })
      }
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

// Direct database operations without async/await
export function createRecord<T>(table: string, data: Partial<T>) {
  return supabase
    .from(table)
    .insert(data)
    .select()
    .single()
}

export function updateRecord<T>(
  table: string,
  id: string | number,
  data: Partial<T>
) {
  return supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single()
}

export function deleteRecord(table: string, id: string | number) {
  return supabase
    .from(table)
    .delete()
    .eq('id', id)
}

export function getRecord<T>(table: string, id: string | number) {
  return supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single()
}

export function getRecords<T>(
  table: string,
  query?: {
    select?: string
    eq?: { column: string; value: any }
    in?: { column: string; values: any[] }
    order?: { column: string; ascending?: boolean }
    limit?: number
  }
) {
  let queryBuilder = supabase.from(table).select(query?.select || '*')

  if (query?.eq) {
    queryBuilder = queryBuilder.eq(query.eq.column, query.eq.value)
  }

  if (query?.in) {
    queryBuilder = queryBuilder.in(query.in.column, query.in.values)
  }

  if (query?.order) {
    queryBuilder = queryBuilder.order(query.order.column, {
      ascending: query.order.ascending ?? true
    })
  }

  if (query?.limit) {
    queryBuilder = queryBuilder.limit(query.limit)
  }

  return queryBuilder
} 