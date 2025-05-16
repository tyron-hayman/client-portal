import Link from 'next/link'

export default function DashboardHeader({ auth } : { auth? : string | null | undefined }) {
    const linkClass : string = 'text-[var(--foreground)] p-2 ml-4';
    const links : Array<{ id : string, title : string, link : string }> = [
        { id : 'Dashboard', title : 'Dashboard', link : '/dashboard'},
        { id : 'Projects', title : 'Projects', link : '/projects'},
        { id : 'Clients', title : 'Clients', link : '/clients'},
    ]

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
                            <li className={`${linkClass}`} key={item.id}><Link href={item.link}>{item.title}</Link></li>
                        )
                    })}
                    <li className={`${linkClass}`}>Sign Out</li>
                </ul>
            </div>
        </div>
      </div>
    );
  }