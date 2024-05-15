import { createClient } from '@supabase/supabase-js'
import type { Database } from '$lib/database.types'
import { json } from '@sveltejs/kit';
import { 
    PRIVATE_SUPABASE_URL, 
    PRIVATE_SUPABASE_ANON_KEY,
} from '$env/static/private';

type DatabaseTables = Database['public']['Tables']
const supabase = createClient<Database>(
    PRIVATE_SUPABASE_URL, 
    PRIVATE_SUPABASE_ANON_KEY
)

export async function POST({ request }) {
    const getData = await request.json()
    const { fullLoad, data } = getData

    if(fullLoad) {
        console.log('Full Load')
        const { data: supabaseData, error } = await supabase
            .from(data.table_name)
            .select('*')
            .eq('course_id', data.course_id)

        console.log(error)
        return json({ data: supabaseData, table_name: data.table_name })
    } else {
        console.log('Semi Load')
        const { data: supabaseData, error } = await supabase
            .from(data.table_name)
            .select('*')
            .eq('course_id', data.course_id)
            .gt('timestamp', data.timestamp)

        console.log(supabaseData, error)
        return json({ data: supabaseData, table_name: data.table_name })
    }

}