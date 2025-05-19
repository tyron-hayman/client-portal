"use client"
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/utils/sanity/client"
import { login } from '@/app/login/actions'
import GlobalLoader from "@/components/GlobalLoader";
import { toast } from "sonner";
import { LoaderCircle } from 'lucide-react';
import { redirect } from "next/navigation";
import { CheckUser } from "@/app/auth/actions";

export default function LoginPage() {
  const [formLoad, setFormLoad] = useState<boolean>(false);
  const [pageData, setPageData] = useState<SanityDocument | null>(null);
  const [formInfo, setFormInfo] = useState<Array<{ email : string, password : string}>>([{
    email : "",
    password : ""
  }])

  const loginWrapVar = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 9,
      transition: {
        duration: 1,
        ease: "anticipate",
      },
    },
  };

  useEffect(() => {
    isLoggedIn();
  }, [])

  const isLoggedIn = async () => {
    let userCheck;
    try {
      userCheck = await CheckUser();
    } catch(error) {
      console.log(error)
    } finally {
      if ( userCheck ) {
        redirect('/dashboard');
      } else {
        getPagetData();
      }
    }
  }

  const handleLogin = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) : Promise<void> => {
    e.preventDefault();
    setFormLoad(true);
    const loginResult = await login(formInfo);
    if ( loginResult.status == "success" ) {
      redirect('/dashboard');
    } else {
      toast(loginResult.message)
      setFormLoad(false)
    }
  }

  const getPagetData = async () => {
    const query = `*[_type == "page" ]{ _id, title, Content  }`;
    const posts = await client.fetch<SanityDocument[]>(query, {}, { next: { revalidate: 30 } });
    if ( posts.length ) {
        setPageData(posts[0])
    }
  }

  return (
    <div className="w-full h-screen min-h-screen flex items-center justify-center">
      {pageData ? 
      <motion.div
        className="w-[500px] p-5"
        variants={loginWrapVar}
        initial="hidden"
        animate="visible"
      >
        <h1 className="font-[family-name:var(--font-urbanist-sans)] text-5xl font-black uppercase mb-5">
          {pageData.title}
        </h1>
        <p className="text-white text-lg leading-relaxed">{pageData.Content}</p>
        <form>
          <input
            type="text"
            name="u_email_login"
            placeholder="Email*"
            className="text-lg w-full border-[var(--foreground)]/10 border-1 border-solid bg-[var(--background)] mt-5 rounded-xl p-3"
            onChange={(e) => setFormInfo([{ ...formInfo[0], email: e.target.value }])}
          />
          <input
            type="password"
            name="u_pass_login"
            placeholder="Password*"
            className="text-lg w-full border-[var(--foreground)]/10 border-1 border-solid bg-[var(--background)] mt-5 rounded-xl p-3"
            onChange={(e) => setFormInfo([{ ...formInfo[0], password: e.target.value }])}
          />
          <div className="mt-10">
            <button type="submit" className="formButtons bg-neutral-800 hover:bg-neutral-900" onClick={(e) => handleLogin(e)}>
              {formLoad ? <LoaderCircle className="animate-spin" color="#c10007" /> : 'Login'}
            </button>
          </div>
        </form>
      </motion.div>
      : 
        <div>
          <GlobalLoader />
        </div>
      }
    </div>
  );
}
