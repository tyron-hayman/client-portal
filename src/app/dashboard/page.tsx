import { createClient } from '@/utils/supabase/server'
import DashboardHeader from '@/components/DashboardHeader'
import DashboardBody from '@/components/DashboardBody'

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase
  .from('users')
  .select()
  .eq('email', user?.email)

  console.log(data)

  return (
    <div className="w-full">
        {data ? <DashboardHeader auth={data[0].name} /> : null }
        <DashboardBody auth={user} />
    </div>
  )
}