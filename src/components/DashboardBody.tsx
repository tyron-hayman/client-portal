import { type User } from "@supabase/supabase-js";
import DashboardBodyAdmin from "./DashboardBodyAdmin";


export default function DashboardBody({ auth, data } : { auth : User | null, data : SupabaseUser | null }) {

    console.log(data)

    return (
      <div className="w-full flex justify-center">
        {data && data.role == 'admin' ? <DashboardBodyAdmin auth={auth} /> : null}
      </div>
    );
  }