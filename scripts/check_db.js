import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mwztucmimewcpkzhkfzy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13enR1Y21pbWV3Y3BremhrZnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzAxNjMsImV4cCI6MjA3OTY0NjE2M30.kjIIxOu4utArdgyUmkCeIbSPtNJ0hNqj-8bsGVcdKu8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLogos() {
    const { data, error } = await supabase
        .from('teams')
        .select('name, logo_url');

    if (error) {
        console.error('Error fetching teams:', error);
    } else {
        console.log('Teams:', data);
    }
}

checkLogos();
const { count, error } = await supabase
    .from('matches')
    .select('*', { count: 'exact', head: true });

if (error) {
    console.error('Error checking matches:', error);
} else {
    console.log(`Total matches in DB: ${count}`);
}

// Also check if we can fetch a few
const { data, error: fetchError } = await supabase
    .from('matches')
    .select('*')
    .limit(5);

if (fetchError) {
    console.error('Error fetching matches:', fetchError);
} else {
    console.log('Sample matches:', data);
}

const { count: teamCount, error: teamError } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true });

if (teamError) {
    console.error('Error checking teams:', teamError);
} else {
    console.log(`Total teams in DB: ${teamCount}`);
    const { data: teamData } = await supabase.from('teams').select('*').limit(1);
    console.log('Sample team:', teamData);
}
}

checkMatches();
