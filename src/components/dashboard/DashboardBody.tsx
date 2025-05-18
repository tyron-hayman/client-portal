import { type User } from "@supabase/supabase-js";


export default function DashboardBody({ auth, data } : { auth : User | null, data : SupabaseUser | null }) {
    return (
      <div className="w-full flex justify-center">
      </div>
    );
  }