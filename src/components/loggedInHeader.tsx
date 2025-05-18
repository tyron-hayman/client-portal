'use client'
import Link from 'next/link'
import { LogOut } from 'lucide-react';
import { redirect, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { logOut } from '@/app/login/actions';

export default function LoggedInHeader({ auth } : { auth? : string | null | undefined }) {
    const pathname = usePathname()
    const linkClass : string = 'py-2 px-4 ml-4 rounded-full';
    const links : Array<{ id : string, title : string, link : string }> = [
        { id : 'Dashboard', title : 'Dashboard', link : '/dashboard'},
        { id : 'Projects', title : 'Projects', link : '/projects'},
        { id : 'Clients', title : 'Clients', link : '/clients'},
    ]

    const handleLogOut = async (e : React.MouseEvent<HTMLAnchorElement, MouseEvent>) : Promise<void> => {
        e.preventDefault();
        const logoutResult = await logOut();
        if ( logoutResult.status == "success" ) {
          redirect('/login');
        } else {
          toast("There was an error logging you out.")
        }
      }

    return (
      <div className="fixed w-full inset-x-0 top-0 z-[10]">
        <div className="p-5 flex justify-between items-center">
            <p className="text-[var(--foreground)] text-md font-black">
                {auth ? `Welcome ${auth}` : 'Client Portal'}
            </p>
            <div>
                <ul className="flex items-center">
                    {links.map((item : { id : string, title : string, link : string }) => {
                        return(
                            <li key={item.id}><Link href={item.link} className={`${linkClass} ${pathname == item.link ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--foreground)]'}`}>{item.title}</Link></li>
                        )
                    })}
                    <li className={`${linkClass}`}><Link href="#" onClick={(e) => handleLogOut(e)}><LogOut /></Link></li>
                </ul>
            </div>
        </div>
      </div>
    );
  }