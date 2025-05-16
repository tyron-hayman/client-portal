'use server'
import supabase from "@/utils/supabase/client";

export async function create(email : string, password : string) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if ( error ) {
            return error;
        } else {
            return data;
        }
    } catch(error) {
        console.log(error);
    }
}