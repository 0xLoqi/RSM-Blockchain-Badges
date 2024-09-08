import { supabase } from '../../src/lib/supabase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(data);
        }
    } else if (req.method === 'POST') {
        const { wallet_address, full_name } = req.body;
        const { data, error } = await supabase
            .from('users')
            .insert({ wallet_address, full_name })
            .single();

        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json(data);
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}