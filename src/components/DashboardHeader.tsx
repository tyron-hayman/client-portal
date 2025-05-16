
export default function DashboardHeader({ auth } : { auth? : string | null | undefined }) {
    return (
      <div className="fixed w-full inset-x-0 top-0 z-[10]">
        <div className="p-5 flex justify-between items-center">
            <p className="text-[var(--foreground)] text-md font-black">
                {auth ? `Welcome ${auth}` : 'Client Portal'}
            </p>
            <div>
                <ul className="flex items-center">
                    <li>Sign Out</li>
                </ul>
            </div>
        </div>
      </div>
    );
  }