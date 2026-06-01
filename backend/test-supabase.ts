import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function test() {
  const { data, error } = await supabase.from('universities').select('count')
  console.log('error:', error ? error.message : 'none')
  console.log('data:', JSON.stringify(data))
}

test()
