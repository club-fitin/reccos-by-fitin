// This is a mock version of the Supabase client that doesn't require actual credentials
// It will allow the build to complete successfully

interface MockResponse<T> {
  data: T | null;
  error: Error | null;
}

interface Chainable<T> {
  eq: (column: string, value: any) => Chainable<T>;
  in: (column: string, values: any[]) => Chainable<T>;
  or: (filters: string) => Chainable<T>;
  contains: (column: string, value: any) => Chainable<T>;
  order: (column: string, { ascending }: { ascending: boolean }) => Promise<MockResponse<T[]>>;
  single: () => Promise<MockResponse<T>>;
  maybeSingle: () => Promise<MockResponse<T>>;
  then: <R>(resolve: (response: MockResponse<T>) => R) => Promise<R>;
}

interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    role?: string;
  };
}

interface AuthResponse {
  data: {
    user: AuthUser | null;
  };
  error: Error | null;
}

export const supabase = {
  from: <T>(table: string) => ({
    select: (query?: string) => {
      const chainable: Chainable<T> = {
        eq: (column: string, value: any) => chainable,
        in: (column: string, values: any[]) => chainable,
        or: (filters: string) => chainable,
        contains: (column: string, value: any) => chainable,
        order: (column: string, { ascending }: { ascending: boolean }) => 
          Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        then: <R>(resolve: (response: MockResponse<T>) => R) => 
          Promise.resolve(resolve({ data: null, error: null }))
      };
      return chainable;
    },
    insert: (data: any) => Promise.resolve({ data: [], error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: [], error: null })
    }),
    delete: () => {
      const chainable: Chainable<any> = {
        eq: (column: string, value: any) => chainable,
        in: (column: string, values: any[]) => chainable,
        or: (filters: string) => chainable,
        contains: (column: string, value: any) => chainable,
        order: (column: string, { ascending }: { ascending: boolean }) => 
          Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        then: <R>(resolve: (response: MockResponse<any>) => R) => 
          Promise.resolve(resolve({ data: null, error: null }))
      };
      return chainable;
    }
  }),
  auth: {
    getUser: (): Promise<AuthResponse> => Promise.resolve({ 
      data: { 
        user: { 
          id: 'mock-user-id', 
          email: 'mock@example.com',
          user_metadata: { role: 'user' }
        } 
      }, 
      error: null 
    }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithPassword: (credentials: { email: string; password: string }): Promise<AuthResponse> => 
      Promise.resolve({ 
        data: { 
          user: { 
            id: 'mock-user-id', 
            email: credentials.email,
            user_metadata: { role: 'user' }
          } 
        }, 
        error: null 
      }),
    signUp: (credentials: { email: string; password: string; options?: any }): Promise<AuthResponse> => 
      Promise.resolve({ 
        data: { 
          user: { 
            id: 'mock-user-id', 
            email: credentials.email,
            user_metadata: { role: 'user' }
          } 
        }, 
        error: null 
      }),
    onAuthStateChange: (callback: (event: string, session: { user: AuthUser } | null) => void) => {
      // Return an unsubscribe function
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  }
}; 