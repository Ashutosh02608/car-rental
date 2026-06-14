import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] pt-32 px-6 flex flex-col gap-8 hidden lg:flex">
         <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-indigo-500"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Oversight</span>
         </div>
         
         <nav className="flex flex-col gap-4">
            <AdminNavLink href="/admin" label="Analytics" />
            <AdminNavLink href="/admin/reservations" label="Reservations" />
            <AdminNavLink href="/admin/fleet" label="Fleet Mgmt" />
            <AdminNavLink href="/admin/users" label="User Registry" />
         </nav>
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

function AdminNavLink({ href, label }) {
  return (
    <Link 
      href={href}
      className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all py-2 border-b border-white/5 hover:border-indigo-500"
    >
      {label}
    </Link>
  )
}
