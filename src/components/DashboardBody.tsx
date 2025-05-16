'use client'
import { redirect } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { type User } from "@supabase/supabase-js";
import supabase from "@/utils/supabase/client";
import { toast } from "sonner";
import { client } from "@/utils/sanity/client"
import GlobalLoader from "./GlobalLoader";

export default function DashboardBody({ auth } : { auth : User | null }) {
    const [pageData, setPageData] = useState<Array<{ title : string | null, desc : string | null}>>([{
        title : null,
        desc : null
    }])
    // const [projects, setProjects] = useState<Array<[]> | null>(null)

    useEffect(() => {
        if ( !auth ) {
            redirect('/login')
        } else {
            getProjects(auth);
            getPageData();
        }
    },[auth])

    const getProjects = async ( auth : User ) => {
        const userID = auth.id;
        try {
            const { data } = await supabase
            .from('projects')
            .select()
            .contains('users', [userID])
            if ( data?.length ) {
                toast("Projects!")
            } else {
                toast("There are no projects.")
            }
        } catch {
            toast("Could not get projects due to an internal error.")
        }
    }

    const getPageData = useCallback( async () : Promise<void> => {
        const query = `*[_type == "dashboard" && _id == "singleton-dashboard"][0]`;
        try {
            const data = await client.fetch(query);
            setPageData([{ ...pageData[0], title : data.title, desc : data.description }])
        } catch {
            toast("There was an error retrieving page data.")
        }
    },[]);

    return (
      <div className="w-full flex justify-center">
        {pageData[0].title && pageData[0].desc ?
        <div className="container my-40">
            <motion.div className="w-full">
                <h2 className="text-2xl text-white font-black uppercase">
                    {pageData[0].title}
                </h2>
                <p className="text-4xl text-neutral-300 leading-relaxed">
                    {pageData[0].desc}
                </p>
            </motion.div>
            <div className="w-full grid grid-cols-3 gap-4 my-10">
                <div className="border-1 border-white/20 border-solid rounded-3xl p-20"></div>
            </div>
        </div>
        : <GlobalLoader />}
      </div>
    );
  }