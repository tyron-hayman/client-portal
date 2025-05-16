import { createClient } from '@/utils/supabase/server'
import DashboardHeader from '@/components/DashboardHeader'
import DashboardBody from '@/components/DashboardBody'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if ( !user ) {
    redirect('/login')
  }

  const { data } = await supabase
  .from('users')
  .select()
  .eq('email', user?.email)

  return (
    <div className="w-full">
        {data ? <DashboardHeader auth={data[0].name} /> : null }
        {data ? <DashboardBody auth={user} data={data[0]} /> : null }
    </div>
  )
}