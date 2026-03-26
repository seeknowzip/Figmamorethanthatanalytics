import { TrendingUp, TrendingDown, Users, DollarSign, Target, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { date: "Mar 18", value: 324500 },
  { date: "Mar 19", value: 356200 },
  { date: "Mar 20", value: 342100 },
  { date: "Mar 21", value: 389400 },
  { date: "Mar 22", value: 412300 },
  { date: "Mar 23", value: 395800 },
  { date: "Mar 24", value: 428700 },
  { date: "Mar 25", value: 445200 },
];

const engagementData = [
  { time: "00:00", sessions: 12400, players: 8200 },
  { time: "04:00", sessions: 9800, players: 6500 },
  { time: "08:00", sessions: 15600, players: 10200 },
  { time: "12:00", sessions: 23400, players: 15800 },
  { time: "16:00", sessions: 28900, players: 19200 },
  { time: "20:00", sessions: 31200, players: 21500 },
];

const gamePerformance = [
  { game: "Stellar Quest", revenue: 145200, retention: 76 },
  { game: "Ocean Voyage", revenue: 132400, retention: 68 },
  { game: "Mystery Tower", revenue: 98700, retention: 72 },
  { game: "Dragon Empire", revenue: 69100, retention: 64 },
];

export function Dashboard() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#e8eaed]">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">Dashboard</h1>
              <p className="text-[#5f6368] text-sm">Real-time performance across all active games</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 bg-white border border-[#e8eaed] rounded-full text-sm text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#5e8fff] focus:border-transparent">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <button className="px-4 py-2 bg-[#1f1f1f] text-white rounded-full text-sm hover:bg-[#3c4043] transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-[1600px]">
        {/* Primary KPIs - Google Labs style cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <KPICard
            label="Total Revenue"
            value="$445,200"
            change="+12.4%"
            trend="up"
            icon={DollarSign}
            bgColor="#5e8fff"
          />
          <KPICard
            label="Active Players"
            value="21,542"
            change="+8.2%"
            trend="up"
            icon={Users}
            bgColor="#ffb3d9"
          />
          <KPICard
            label="Avg Session Time"
            value="24m 32s"
            change="-2.1%"
            trend="down"
            icon={Activity}
            bgColor="#00f5a0"
          />
          <KPICard
            label="Conversion Rate"
            value="6.8%"
            change="+0.4pp"
            trend="up"
            icon={Target}
            bgColor="#ff8c69"
          />
        </div>

        {/* Revenue Trend - Main Chart */}
        <div className="mb-6">
          <div className="bg-white rounded-3xl p-8 border border-[#e8eaed]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="mb-1">Revenue Performance</h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <div className="font-mono text-3xl font-bold text-[#1f1f1f]">
                    $445,200
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00f5a0] rounded-full">
                    <TrendingUp className="w-4 h-4 text-[#1f1f1f]" />
                    <span className="font-mono text-sm font-semibold text-[#1f1f1f]">+12.4%</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm text-[#5f6368] hover:text-[#1f1f1f] hover:bg-[#f8f9fa] rounded-full transition-colors">
                  24H
                </button>
                <button className="px-4 py-2 text-sm bg-[#1f1f1f] text-white rounded-full">
                  7D
                </button>
                <button className="px-4 py-2 text-sm text-[#5f6368] hover:text-[#1f1f1f] hover:bg-[#f8f9fa] rounded-full transition-colors">
                  30D
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5e8fff" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#5e8fff" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#5f6368"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#e8eaed' }}
                  />
                  <YAxis
                    stroke="#5f6368"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e8eaed',
                      borderRadius: '16px',
                      fontSize: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#5e8fff"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Analytics - Two Column */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Engagement */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8eaed]">
            <div className="mb-5">
              <h3 className="mb-1">Daily Engagement Pattern</h3>
              <p className="text-sm text-[#5f6368]">Sessions and concurrent players</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="#5f6368"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e8eaed' }}
                  />
                  <YAxis
                    stroke="#5f6368"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e8eaed',
                      borderRadius: '16px',
                      fontSize: '11px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#5e8fff"
                    strokeWidth={3}
                    dot={false}
                    name="Sessions"
                  />
                  <Line
                    type="monotone"
                    dataKey="players"
                    stroke="#00f5a0"
                    strokeWidth={3}
                    dot={false}
                    name="Players"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Game Performance */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8eaed]">
            <div className="mb-5">
              <h3 className="mb-1">Game Performance</h3>
              <p className="text-sm text-[#5f6368]">Top revenue generators today</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gamePerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#5f6368"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e8eaed' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="game"
                    stroke="#5f6368"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e8eaed',
                      borderRadius: '16px',
                      fontSize: '11px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#ffb3d9" radius={[0, 12, 12, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insights Section - Google Labs style */}
        <div className="bg-[#d4ff00] rounded-3xl p-8 border border-[#e8eaed]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#1f1f1f] rounded-3xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-3 text-[#1f1f1f]">Strong Weekend Performance Continues</h3>
              <p className="text-[#1f1f1f] leading-relaxed mb-4">
                Revenue growth accelerated by <span className="font-mono font-bold">12.4%</span> this week, 
                driven primarily by increased engagement in Stellar Quest and Ocean Voyage. Weekend conversion rates 
                exceeded targets, with Sunday showing the highest single-day revenue at <span className="font-mono font-bold">$445.2k</span>.
              </p>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-[#1f1f1f] text-white rounded-full text-sm hover:bg-[#3c4043] transition-colors">
                  View Full Analysis
                </button>
                <button className="px-5 py-2.5 bg-white border border-[#1f1f1f] text-[#1f1f1f] rounded-full text-sm hover:bg-[#f8f9fa] transition-colors">
                  Compare Period
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface KPICardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  bgColor: string;
}

function KPICard({ label, value, change, trend, icon: Icon, bgColor }: KPICardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#e8eaed] hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <Icon className="w-5 h-5 text-[#1f1f1f]" strokeWidth={2} />
        </div>
        <div className="text-xs uppercase tracking-wider text-[#5f6368] font-medium">
          {label}
        </div>
      </div>
      <div className="mb-2">
        <div className="font-mono text-2xl font-bold text-[#1f1f1f]">
          {value}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 font-mono text-xs font-semibold px-2.5 py-1 rounded-full ${
          trend === "up" ? "bg-[#00f5a0] text-[#1f1f1f]" : "bg-[#f1f3f4] text-[#5f6368]"
        }`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
    </div>
  );
}
