'use server'
import { createClient } from '@/utils/supabase/server'

export async function CheckUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if ( user ) {
    return user;
  } else {
    return false;
  }

  }