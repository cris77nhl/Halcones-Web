import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const createSupabaseClient = () => {
    try {
        if (supabaseUrl && supabaseAnonKey) {
            return createClient(supabaseUrl, supabaseAnonKey);
        }
    } catch (error) {
        console.error('Error creating Supabase client:', error);
    }

    console.error('Supabase credentials missing or invalid! Check your .env file.');

    // Return a mock client to prevent app crash
    const createMockBuilder = (data = []) => {
        const builder = {
            select: () => builder,
            gte: () => builder,
            lt: () => builder,
            eq: () => builder,
            order: () => builder,
            limit: () => builder,
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            then: (resolve) => resolve({ data: [], error: { message: 'Supabase not configured' } })
        };
        return builder;
    };

    return {
        from: () => createMockBuilder(),
        auth: {
            signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } })
        }
    };
};

export const supabase = createSupabaseClient();
