const SUPABASE_URL = 'https://qydsigowszhtfxgqasyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5ZHNpZ293c3podGZ4Z3Fhc3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAwMDEyMzIsImV4cCI6MTk3NTU3NzIzMn0.NkXzWeFd8EUOb7YsydiXALdYvDucbOZacLx_gg-KPZ8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/*
assumptions you can make:

The table name in supabase is `games`

The games are stored in the database using this data model:
{
   name1: ,
   name2: ,
   score1: ,
   score2: ,
}
*/

export async function createGame(game){
    // create a single new game in the games table using the above object
    const response = await client.from('games').insert(game);
    return checkError(response);
}

export async function getGames() {
    // select all games from the games table
    const response = await client.from('games').select('*');
    return checkError(response);    
}

// export async function getUser() {
//     return client.auth.session();
// }


// export async function checkAuth() {
//     const user = await getUser();

//     if (!user) location.replace('../'); 
// }

// export async function redirectToGames() {
//     if (await getUser()) {
//         location.replace('./games');
//     }
// }

// export async function signupUser(email, password){
//     const response = await client.auth.signUp({ email, password });
    
//     return response.user;
// }

// export async function signInUser(email, password){
//     const response = await client.auth.signIn({ email, password });

//     return response.user;
// }

// export async function logout() {
//     await client.auth.signOut();

//     return window.location.href = '../';
// }

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
