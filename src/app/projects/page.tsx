import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LoggedInHeader from '@/components/loggedInHeader'
import ProjectTable from '@/components/projects/ProjectTable'

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
        {data ?
        <>
          <LoggedInHeader auth={data[0].name} /> 
          <ProjectTable userdata={data[0]} />
        </>
        : null }
    </div>
  )
}