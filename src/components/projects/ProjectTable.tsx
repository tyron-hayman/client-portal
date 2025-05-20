'use client'
import supabase from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function ProjectTable({ userdata } : { userdata : SupabaseUser | null }) {
    const [projectData, setProjectData] = useState<Array<[]> | null>(null)

    const getProjects = async () : Promise<void> => {
        try {
        const { data : projects } = await supabase
        .from('projects')
        .select('*')
        .contains('email', [userdata?.email])
        setProjectData(projects);
        console.log(projects);
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProjects();
    },[]);

    return (
      <div className="w-full flex justify-center my-40">
        {projectData && projectData.length > 0 ? 
        <div className="w-full">

        </div>
        : <p className="text-[var(--foreground)] text-lg">There are no projects to display</p>}
      </div>
    );
  }