import Link from "next/link";
import { Building2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-border/50 relative z-10 m-4">
        {/* Brand Header */}
        <div className="bg-slate-900 px-8 py-10 flex flex-col items-center justify-center border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            FlowState
          </Link>
          <p className="text-slate-400 text-sm font-medium">Premium Real Estate Discovery</p>
        </div>
        
        {/* Form Container */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
