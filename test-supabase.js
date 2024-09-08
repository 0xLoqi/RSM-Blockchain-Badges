import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        const { data, error } = await supabase
            .from('badges')
            .select('*');

        if (error) throw error;

        console.log('Successfully connected to Supabase');
        console.log('Fetched data:', data);
    } catch (error) {
        console.error('Error connecting to Supabase:', error);
    }
}

testConnection();