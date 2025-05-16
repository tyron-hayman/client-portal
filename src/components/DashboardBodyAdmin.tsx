'use client'
import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { type User } from "@supabase/supabase-js";
import supabase from "@/utils/supabase/client";
import { toast } from "sonner";
import { client } from "@/utils/sanity/client"
import GlobalLoader from "./GlobalLoader";


export default function DashboardBodyAdmin({ auth } : { auth : User | null }) {
    const [pageData, setPageData] = useState<Array<{ title : string | null, desc : string | null}>>([{
        title : null,
        desc : null
    }])
    const [projects, setProjects] = useState<Array<[]> | null>(null)

    useEffect(() => {
        if ( auth ) {
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
                setProjects(data)
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
                <h2 className="text-2xl text-[var(--foreground)] font-black uppercase m-0 p-0">
                    {pageData[0].title}
                </h2>
                <p className="text-4xl text-[var(--foreground)]/70 leading-relaxed">
                    {pageData[0].desc}
                </p>
            </motion.div>
            <div className="w-full grid grid-cols-3 gap-4 my-10">
               {projects ?
                    <div className="col-span-3">
                        <p className="text-text-[var(--foreground)] text-lg">projects</p>
                    </div>
                :
                    <div className="col-span-3">
                        <p className="text-text-[var(--foreground)] text-lg">You have not added any projects</p>
                    </div>
                }
            </div>
        </div>
        : <GlobalLoader />}
      </div>
    );
  }