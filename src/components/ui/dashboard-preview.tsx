"use client";

import { ChevronDown, ChevronRight, MoreVertical, Plus, Search, Bell } from "lucide-react";

const DashboardPreview = () => {
  return (
    <div className="rounded-2xl overflow-hidden p-3 md:p-4 select-none pointer-events-none"
      style={{
        background: 'rgba(255, 255, 255, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: 'var(--shadow-dashboard)',
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border text-[11px] bg-background/50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-[8px]">
            C
          </div>
          <span className="font-semibold text-foreground">Cursus</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2 flex-1 mx-4 bg-secondary rounded-full px-3 py-1.5">
          <Search className="w-3 h-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="⌘K"
            className="bg-transparent text-foreground outline-none w-full text-[10px]"
            disabled
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="px-2 py-1 text-[10px] rounded-full bg-primary text-primary-foreground font-medium">
            New Application
          </button>
          <Bell className="w-3 h-3 text-muted-foreground" />
          <div className="w-5 h-5 rounded bg-accent text-accent-foreground flex items-center justify-center text-[7px] font-bold">
            JB
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-40 bg-background/50 border-r border-border p-2">
          <div className="space-y-1 text-[10px]">
            {/* Main nav */}
            <div className="px-2 py-1.5 rounded bg-primary text-primary-foreground font-medium flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-current" />
              Home
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                Applications
              </span>
              <span className="bg-accent text-accent-foreground rounded-full px-1.5 text-[8px] font-bold">10</span>
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              Interviews
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                Tasks
              </span>
              <ChevronRight className="w-2.5 h-2.5" />
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              Resume
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              Salary
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                Companies
              </span>
              <ChevronRight className="w-2.5 h-2.5" />
            </div>

            {/* Tools section */}
            <div className="mt-3 px-2 py-1 text-[9px] font-bold text-muted-foreground uppercase">Tools</div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded-full bg-muted" />
              AI Assistant
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded-full bg-muted" />
              Career Briefing
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded-full bg-muted" />
              Notifications
            </div>
            <div className="px-2 py-1.5 rounded text-foreground hover:bg-secondary flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded-full bg-muted" />
              Settings
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-secondary/30 p-4 space-y-4 overflow-hidden">
          {/* Greeting */}
          <div className="text-sm font-semibold text-foreground">Welcome, Jane</div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button className="rounded-full px-3 py-1.5 text-[10px] bg-accent text-accent-foreground font-medium hover:bg-accent/90">
              Apply
            </button>
            <button className="rounded-full px-3 py-1.5 text-[10px] bg-secondary text-foreground font-medium border border-border hover:bg-muted">
              Track
            </button>
            <button className="rounded-full px-3 py-1.5 text-[10px] bg-secondary text-foreground font-medium border border-border hover:bg-muted">
              Upload Resume
            </button>
            <button className="rounded-full px-3 py-1.5 text-[10px] bg-secondary text-foreground font-medium border border-border hover:bg-muted">
              Research Company
            </button>
            <button className="rounded-full px-3 py-1.5 text-[10px] bg-secondary text-foreground font-medium border border-border hover:bg-muted">
              Prep Interview
            </button>
            <button className="rounded-full px-3 py-1.5 text-[10px] bg-secondary text-foreground font-medium border border-border hover:bg-muted">
              Create Resume
            </button>
            <span className="text-[10px] text-muted-foreground">+ Customize</span>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Applications Card */}
            <div className="bg-background rounded-lg p-3 border border-border text-[11px]">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-foreground font-semibold">Applications This Month</span>
                <span className="text-accent">✓</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">48</div>
              <div className="text-xs text-muted-foreground mb-2">active roles</div>
              
              {/* Stats */}
              <div className="space-y-1 text-[9px] mb-2">
                <div className="text-muted-foreground">Last 30 Days</div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">+12 Interviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600">-5 Rejections</span>
                </div>
              </div>

              {/* Chart */}
              <svg viewBox="0 0 200 80" className="w-full h-20" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 60 C 40 40, 70 35, 100 50 C 130 65, 160 45, 190 30"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 10 60 C 40 40, 70 35, 100 50 C 130 65, 160 45, 190 30 L 190 80 L 10 80 Z"
                  fill="url(#chartGradient)"
                />
              </svg>
            </div>

            {/* Pipeline Card */}
            <div className="bg-background rounded-lg p-3 border border-border text-[11px]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">My Pipeline</span>
                <div className="flex items-center gap-1">
                  <Plus className="w-3 h-3 text-muted-foreground cursor-pointer" />
                  <MoreVertical className="w-3 h-3 text-muted-foreground cursor-pointer" />
                </div>
              </div>

              <div className="space-y-0 text-[10px]">
                <div className="flex items-center justify-between py-3">
                  <span className="text-foreground">Applied</span>
                  <span className="font-bold text-foreground">48 roles</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-foreground">Interviewing</span>
                  <span className="font-bold text-foreground">6 roles</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-foreground">Offers</span>
                  <span className="font-bold text-foreground">2 roles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Table */}
          <div className="bg-background rounded-lg p-3 border border-border text-[11px]">
            <div className="font-semibold text-foreground mb-2">Recent Activity</div>
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-4 gap-2 text-[9px] text-muted-foreground font-bold py-1 px-2">
                <span>Date</span>
                <span>Company</span>
                <span>Role</span>
                <span>Status</span>
              </div>

              {/* Rows */}
              <div className="grid grid-cols-4 gap-2 text-[10px] py-1.5 px-2 hover:bg-secondary/30 rounded">
                <span className="text-muted-foreground">Today</span>
                <span className="font-medium text-foreground">Google</span>
                <span className="text-foreground">Software Engineer</span>
                <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">Interviewing</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-[10px] py-1.5 px-2 hover:bg-secondary/30 rounded">
                <span className="text-muted-foreground">Yesterday</span>
                <span className="font-medium text-foreground">Stripe</span>
                <span className="text-foreground">Frontend Dev</span>
                <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Offer</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-[10px] py-1.5 px-2 hover:bg-secondary/30 rounded">
                <span className="text-muted-foreground">2 days ago</span>
                <span className="font-medium text-foreground">Meta</span>
                <span className="text-foreground">Product Manager</span>
                <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">Applied</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-[10px] py-1.5 px-2 hover:bg-secondary/30 rounded">
                <span className="text-muted-foreground">3 days ago</span>
                <span className="font-medium text-foreground">Shopify</span>
                <span className="text-foreground">Full Stack Dev</span>
                <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">Applied</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
