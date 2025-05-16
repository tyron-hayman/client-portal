'use server'
import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login( formInfo: Array<{ email : string, password : string}>) {
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formInfo[0].email,
    password: formInfo[0].password,
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    return { status : "error", message : error.message}
  }
  revalidatePath('/', 'layout')
  return { status : "success", message : "" }
}

export async function signup(formInfo : Array<{ email : string, password : string}>) {
  const supabase = await createClient()
  const data = {
    email: formInfo[0].email,
    password: formInfo[0].email,
  }
  const { error } = await supabase.auth.signUp(data)
  if (error) {
    return { status : "error", message : error.message}
  }
  revalidatePath('/', 'layout')
  return { status : "success", message : "" }
}

export async function logOut() {
  const supabase = await createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    return { status : "success", message : "" }
  } else {
    return { status : "error", message : ""}
  }
}