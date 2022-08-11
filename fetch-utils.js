const SUPABASE_URL = 'https://qydsigowszhtfxgqasyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5ZHNpZ293c3podGZ4Z3Fhc3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAwMDEyMzIsImV4cCI6MTk3NTU3NzIzMn0.NkXzWeFd8EUOb7YsydiXALdYvDucbOZacLx_gg-KPZ8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createGame(game){
    const response = await client.from('games').insert(game);
    return checkError(response);
}

export async function getGames() {
    const response = await client.from('games').select('*');
    return checkError(response);    
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
