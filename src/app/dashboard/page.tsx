import { createClient } from '@/utils/supabase/server'
import LoggedInHeader from '@/components/loggedInHeader'
import DashboardBody from '@/components/dashboard/DashboardBody'
import DashboardBodyAdmin from '@/components/dashboard/DashboardBodyAdmin'
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
        {data ? <LoggedInHeader auth={data[0].name} /> : null }
        {data && data[0].role == 'admin' ? <DashboardBodyAdmin auth={user} /> : null }
        {data && data[0].role == 'user' ? <DashboardBody auth={user} data={data[0]} /> : null }
    </div>
  )
}