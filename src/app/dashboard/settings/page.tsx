"use client";

import { User, Bell, Shield, Wallet, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your administrative profile and preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <section className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
               <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-500 overflow-hidden ring-4 ring-white shadow-xl">
                    AD
                  </div>
                  <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg hover:scale-110 transition-transform">
                    <Camera className="h-4 w-4" />
                  </button>
               </div>
               <div className="flex-1">
                 <h2 className="text-2xl font-bold">Admin User</h2>
                 <p className="text-muted-foreground">Pro Agent with FlowState since Oct 2023</p>
                 <div className="mt-4 flex gap-2">
                   <Button variant="outline" size="sm" className="rounded-xl font-semibold">Change Photo</Button>
                   <Button variant="ghost" size="sm" className="rounded-xl font-semibold text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Full Name</label>
                <input defaultValue="Admin User" className="w-full flex h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email Address</label>
                <input defaultValue="admin@flowstate.com" className="w-full flex h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Phone Number</label>
                <input defaultValue="+1 (555) 0123" className="w-full h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Agency Name</label>
                <input defaultValue="FlowState Global Partners" className="w-full h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50/50 border-t border-border flex justify-end">
            <Button className="rounded-xl bg-primary hover:bg-primary/90 font-bold px-8">Save Changes</Button>
          </div>
        </section>

        {/* Preferences Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <section className="bg-white rounded-3xl border border-border shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                   <Bell className="h-5 w-5" />
                 </div>
                 <h2 className="text-lg font-bold">Notifications</h2>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-sm font-semibold">New Lead Alerts</p>
                       <p className="text-xs text-muted-foreground">Email when someone inquires.</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                       <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full transition-all"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-sm font-semibold">Weekly Reporting</p>
                       <p className="text-xs text-muted-foreground">Portfolio summary once a week.</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                       <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition-all"></div>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-white rounded-3xl border border-border shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                   <Shield className="h-5 w-5" />
                 </div>
                 <h2 className="text-lg font-bold">Security</h2>
              </div>
              <div className="space-y-4">
                 <Button variant="outline" className="w-full rounded-xl h-10 font-semibold border-border">Change Password</Button>
                 <Button variant="outline" className="w-full rounded-xl h-10 font-semibold border-border">Two-Factor Auth</Button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
