// This is a mock version of the Supabase client that doesn't require actual credentials
// It will allow the build to complete successfully

interface MockResponse<T> {
  data: T | null;
  error: Error | null;
}

const mockClient = {
  from: (table: string) => ({
    select: (query?: string) => {
      const chainable = {
        eq: (column: string, value: any) => chainable,
        in: (column: string, values: any[]) => chainable,
        or: (filters: string) => chainable,
        contains: (column: string, value: any) => chainable,
        order: (column: string, { ascending }: { ascending: boolean } = { ascending: true }) => 
          Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        then: (resolve: any) => Promise.resolve(resolve({ data: [], error: null }))
      };
      return chainable;
    },
    insert: (data: any) => Promise.resolve({ data: [], error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: [], error: null })
    }),
    delete: () => {
      const chainable = {
        eq: (column: string, value: any) => ({
          ...chainable,
          eq: (column: string, value: any) => 
            Promise.resolve({ data: null, error: null }),
          then: (resolve: any) => 
            Promise.resolve(resolve({ data: null, error: null }))
        }),
        then: (resolve: any) => 
          Promise.resolve(resolve({ data: null, error: null }))
      };
      return chainable;
    }
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: (callback: Function) => {
      // Return an unsubscribe function
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  }
};

export function createClient() {
  return mockClient;
} 