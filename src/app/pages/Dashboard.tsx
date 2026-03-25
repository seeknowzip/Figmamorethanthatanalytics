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
    <div className="min-h-screen" style={{ backgroundColor: '#fafbfc' }}>
      {/* Header - Mixpanel style */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">Dashboard</h1>
              <p className="text-[#6b7280] text-sm">Real-time performance across all active games</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-[#4285f4] to-[#9334e9] text-white rounded-lg text-sm hover:shadow-lg transition-all duration-200">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-[1600px]">
        {/* Primary KPIs - Vibrant cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <KPICard
            label="Total Revenue"
            value="$445,200"
            change="+12.4%"
            trend="up"
            icon={DollarSign}
            gradient="from-[#4285f4] to-[#1e40af]"
          />
          <KPICard
            label="Active Players"
            value="21,542"
            change="+8.2%"
            trend="up"
            icon={Users}
            gradient="from-[#9334e9] to-[#ec4899]"
          />
          <KPICard
            label="Avg Session Time"
            value="24m 32s"
            change="-2.1%"
            trend="down"
            icon={Activity}
            gradient="from-[#10b981] to-[#059669]"
          />
          <KPICard
            label="Conversion Rate"
            value="6.8%"
            change="+0.4pp"
            trend="up"
            icon={Target}
            gradient="from-[#f97316] to-[#ea580c]"
          />
        </div>

        {/* Revenue Trend - Main Chart */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="mb-1">Revenue Performance</h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <div className="font-mono text-3xl font-bold bg-gradient-to-r from-[#4285f4] to-[#9334e9] bg-clip-text text-transparent">
                    $445,200
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-[#10b981]/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[#10b981]" />
                    <span className="font-mono text-sm font-semibold text-[#10b981]">+12.4%</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-[#6b7280] hover:text-[#4285f4] hover:bg-[#f3f4f6] rounded-lg transition-colors">
                  24H
                </button>
                <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-[#4285f4] to-[#9334e9] text-white rounded-lg shadow-sm">
                  7D
                </button>
                <button className="px-3 py-1.5 text-sm text-[#6b7280] hover:text-[#4285f4] hover:bg-[#f3f4f6] rounded-lg transition-colors">
                  30D
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4285f4" stopOpacity={0.3} />
                      <stop offset="50%" stopColor="#9334e9" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4285f4"
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
          <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-5">
              <h3 className="mb-1">Daily Engagement Pattern</h3>
              <p className="text-sm text-[#6b7280]">Sessions and concurrent players</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <defs>
                    <linearGradient id="sessionsGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4285f4" />
                      <stop offset="100%" stopColor="#9334e9" />
                    </linearGradient>
                    <linearGradient id="playersGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="url(#sessionsGradient)"
                    strokeWidth={3}
                    dot={false}
                    name="Sessions"
                  />
                  <Line
                    type="monotone"
                    dataKey="players"
                    stroke="url(#playersGradient)"
                    strokeWidth={3}
                    dot={false}
                    name="Players"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Game Performance */}
          <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-5">
              <h3 className="mb-1">Game Performance</h3>
              <p className="text-sm text-[#6b7280]">Top revenue generators today</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gamePerformance} layout="horizontal">
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4285f4" />
                      <stop offset="50%" stopColor="#9334e9" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="game"
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="url(#barGradient)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insights Section - Vibrant gradient card */}
        <div className="bg-gradient-to-br from-[#4285f4]/10 via-[#9334e9]/5 to-[#ec4899]/10 rounded-2xl p-8 border border-[#e5e7eb] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4285f4] to-[#9334e9] rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-3">Strong Weekend Performance Continues</h3>
              <p className="text-[#111827] leading-relaxed mb-4">
                Revenue growth accelerated by <span className="font-mono font-bold text-[#4285f4]">12.4%</span> this week, 
                driven primarily by increased engagement in Stellar Quest and Ocean Voyage. Weekend conversion rates 
                exceeded targets, with Sunday showing the highest single-day revenue at <span className="font-mono font-bold text-[#9334e9]">$445.2k</span>.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-[#4285f4] to-[#9334e9] text-white rounded-lg text-sm hover:shadow-lg transition-all duration-200">
                  View Full Analysis
                </button>
                <button className="px-4 py-2 bg-white border border-[#e5e7eb] text-[#111827] rounded-lg text-sm hover:border-[#4285f4] hover:text-[#4285f4] transition-colors">
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
  gradient: string;
}

function KPICard({ label, value, change, trend, icon: Icon, gradient }: KPICardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <div className="text-xs uppercase tracking-wider text-[#6b7280] font-medium">
          {label}
        </div>
      </div>
      <div className="mb-2">
        <div className="font-mono text-2xl font-bold text-[#111827]">
          {value}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 font-mono text-xs font-semibold px-2 py-1 rounded-lg ${
          trend === "up" ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[#6b7280]/10 text-[#6b7280]"
        }`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
    </div>
  );
}
