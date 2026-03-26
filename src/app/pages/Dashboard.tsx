import { ElementType, ReactNode } from "react";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap, Clock, Activity, RefreshCw } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, ComposedChart, Line,
  ScatterChart, Scatter, ZAxis,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ── Data ──────────────────────────────────────────────────────────────────────

const spark = {
  revenue: [31, 34, 33, 36, 38, 41, 40, 43, 42, 45, 44, 47, 46, 49],
  dau:     [18, 19, 19, 20, 20, 21, 20, 21, 21, 22, 21, 22, 22, 23],
  d7ret:   [64, 65, 64, 66, 65, 67, 66, 68, 67, 69, 68, 69, 68, 70],
  arpdau:  [38, 39, 38, 40, 41, 42, 41, 43, 42, 44, 43, 45, 45, 46],
  session: [22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29],
  conv:    [61, 62, 62, 63, 63, 64, 64, 65, 65, 66, 67, 67, 68, 70],
};

const revenueData = [
  { date: "Mar 12", revenue: 312, forecast: 300 },
  { date: "Mar 13", revenue: 325, forecast: 311 },
  { date: "Mar 14", revenue: 318, forecast: 321 },
  { date: "Mar 15", revenue: 342, forecast: 330 },
  { date: "Mar 16", revenue: 368, forecast: 338 },
  { date: "Mar 17", revenue: 395, forecast: 345 },
  { date: "Mar 18", revenue: 412, forecast: 352 },
  { date: "Mar 19", revenue: 398, forecast: 360 },
  { date: "Mar 20", revenue: 388, forecast: 367 },
  { date: "Mar 21", revenue: 415, forecast: 374 },
  { date: "Mar 22", revenue: 432, forecast: 381 },
  { date: "Mar 23", revenue: 428, forecast: 388 },
  { date: "Mar 24", revenue: 445, forecast: 394 },
  { date: "Mar 25", revenue: 462, forecast: 400 },
];

const dauData = [
  { date: "Mar 12", dau: 18200, nru: 2100 },
  { date: "Mar 14", dau: 19400, nru: 2340 },
  { date: "Mar 16", dau: 20100, nru: 2510 },
  { date: "Mar 18", dau: 20800, nru: 2280 },
  { date: "Mar 20", dau: 21200, nru: 2450 },
  { date: "Mar 22", dau: 21542, nru: 2640 },
  { date: "Mar 24", dau: 22100, nru: 2820 },
];

const platformData = [
  { name: "iOS", value: 45, color: "#5e8fff" },
  { name: "Android", value: 35, color: "#ffb3d9" },
  { name: "Web", value: 20, color: "#00f5a0" },
];

const regionData = [
  { name: "NA", value: 38, color: "#5e8fff" },
  { name: "EU", value: 34, color: "#b8a3ff" },
  { name: "APAC", value: 20, color: "#ff8c69" },
  { name: "Others", value: 8, color: "#ffb3d9" },
];

const bubbleGames = [
  { x: 76, y: 145, z: 1600, name: "Stellar Quest", color: "#5e8fff" },
  { x: 68, y: 132, z: 1200, name: "Ocean Voyage", color: "#ffb3d9" },
  { x: 72, y: 98,  z: 900,  name: "Mystery Tower", color: "#00f5a0" },
  { x: 64, y: 69,  z: 600,  name: "Dragon Empire", color: "#ff8c69" },
];

const radarData = [
  { subject: "Retention", stellar: 90, ocean: 80 },
  { subject: "Revenue",   stellar: 95, ocean: 85 },
  { subject: "Engagement",stellar: 78, ocean: 82 },
  { subject: "Stability", stellar: 88, ocean: 76 },
  { subject: "Growth",    stellar: 82, ocean: 74 },
  { subject: "ARPDAU",    stellar: 92, ocean: 80 },
];

const kpis = [
  { label: "Total Revenue", value: "$462k",   change: "+12.4%",  trend: "up",   icon: DollarSign, color: "#5e8fff", spark: spark.revenue },
  { label: "Active Players", value: "22,100",  change: "+8.2%",   trend: "up",   icon: Users,      color: "#ffb3d9", spark: spark.dau },
  { label: "D7 Retention",   value: "68.4%",   change: "+2.1pp",  trend: "up",   icon: Target,     color: "#00f5a0", spark: spark.d7ret },
  { label: "ARPDAU",         value: "$4.82",   change: "+$0.18",  trend: "up",   icon: Zap,        color: "#ff8c69", spark: spark.arpdau },
  { label: "Avg Session",    value: "28m 14s", change: "+4.2%",   trend: "up",   icon: Clock,      color: "#b8a3ff", spark: spark.session },
  { label: "Conversion",     value: "7.0%",    change: "-0.1pp",  trend: "down", icon: Activity,   color: "#d4ff00", spark: spark.conv },
];

const TOOLTIP_STYLE = {
  backgroundColor: "#ffffff",
  border: "1px solid #e8eaed",
  borderRadius: "16px",
  fontSize: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

const AXIS_PROPS = {
  stroke: "#9aa0a6",
  fontSize: 11,
  tickLine: false,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function SparkLine({ data, color }: { data: number[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={36}>
      <BarChart data={data.map((v) => ({ v }))} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="v" fill={color} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface KPICardProps {
  label: string; value: string; change: string; trend: "up" | "down";
  icon: ElementType; color: string; spark: number[];
}
function KPICard({ label, value, change, trend, icon: Icon, color, spark }: KPICardProps) {
  const isUp = trend === "up";
  return (
    <div className="bg-white rounded-3xl p-5 border border-[#e8eaed] hover:shadow-lg hover:border-transparent transition-all duration-200 cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: color }}>
          <Icon className="w-4 h-4 text-[#1f1f1f]" strokeWidth={2} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full font-mono text-[11px] font-semibold ${
          isUp ? "bg-[#e6f9f0] text-[#1a7a4a]" : "bg-[#fef0f0] text-[#c0392b]"
        }`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div className="text-xs uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">{label}</div>
      <div className="font-mono text-2xl font-bold text-[#1f1f1f] mb-2">{value}</div>
      <div className="opacity-50">
        <SparkLine data={spark} color={color} />
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children, badge }: {
  title: string; subtitle?: string; children: ReactNode; badge?: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#e8eaed]">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[#1f1f1f] mb-0.5">{title}</h3>
          {subtitle && <p className="text-sm text-[#9aa0a6]">{subtitle}</p>}
        </div>
        {badge && (
          <div className="px-3 py-1 bg-[#f8f9fa] text-[#5f6368] text-xs font-mono rounded-full">{badge}</div>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Custom ScatterDot with tooltip label ────────────────────────────────────

function CustomScatterDot(props: {
  cx?: number; cy?: number; r?: number; fill?: string; payload?: (typeof bubbleGames)[0];
}) {
  const { cx = 0, cy = 0, r = 8, fill, payload } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} fillOpacity={0.85} stroke="white" strokeWidth={2} />
      <text x={cx} y={cy - r - 5} textAnchor="middle" fontSize={10} fill="#5f6368" fontWeight={600}>
        {payload?.name.split(" ")[0]}
      </text>
    </g>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#e8eaed] px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Overview</div>
            <h1 className="text-[#1f1f1f]">Dashboard</h1>
            <p className="text-sm text-[#5f6368] mt-0.5">Real-time performance across all active games · Mar 25, 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e6f9f0] rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a7a4a] animate-pulse" />
              <span className="text-xs font-medium text-[#1a7a4a]">Live · D-2 confirmed</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#e8eaed] text-[#5f6368] text-sm rounded-full hover:bg-[#f8f9fa] transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <select className="px-4 py-2 bg-white border border-[#e8eaed] rounded-full text-sm text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#5e8fff]">
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-8 py-7 max-w-[1600px]">

        {/* ── KPI Grid (6 cards with sparklines) ─────────────────────────── */}
        <div className="grid grid-cols-6 gap-4 mb-7">
          {kpis.map((kpi) => (
            <KPICard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* ── Revenue Trend (AreaChart + Forecast Line) ────────────────────── */}
        <ChartCard
          title="Revenue Performance"
          subtitle="Daily revenue vs forecast — 14-day window"
          badge="Mar 12 – Mar 25"
        >
          <div className="flex items-baseline gap-4 mb-5">
            <div className="font-mono text-4xl font-bold text-[#1f1f1f]">$462k</div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d4ff00] rounded-full">
              <TrendingUp className="w-3.5 h-3.5 text-[#1f1f1f]" />
              <span className="font-mono text-sm font-bold text-[#1f1f1f]">+12.4% WoW</span>
            </div>
            <span className="text-sm text-[#9aa0a6]">$400k forecast → $462k actual</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5e8fff" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#5e8fff" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e8eaed" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#e8eaed" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
                <XAxis dataKey="date" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
                <YAxis {...AXIS_PROPS} axisLine={false} tickFormatter={(v) => `$${v}k`} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, n) => [`$${v}k`, n === "revenue" ? "Actual" : "Forecast"]} />
                <Area type="monotone" dataKey="forecast" stroke="#c5cad0" strokeWidth={2} strokeDasharray="6 3" fill="url(#forecastGrad)" name="forecast" dot={false} />
                <Area type="monotone" dataKey="revenue" stroke="#5e8fff" strokeWidth={3} fill="url(#revGrad)" name="revenue" dot={false} activeDot={{ r: 6, fill: "#5e8fff", stroke: "white", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* ── Row 2: ComposedChart + PieChart ─────────────────────────────── */}
        <div className="grid grid-cols-5 gap-5 mt-5">
          {/* ComposedChart: DAU bars + NRU bars */}
          <div className="col-span-3">
            <ChartCard title="User Acquisition & Engagement" subtitle="DAU (bars) · New Registrations (bars) by bi-daily snapshot">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={dauData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
                    <XAxis dataKey="date" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
                    <YAxis {...AXIS_PROPS} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} yAxisId="left" />
                    <YAxis {...AXIS_PROPS} axisLine={false} orientation="right" tickFormatter={(v) => `${v.toLocaleString()}`} yAxisId="right" />
                    <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [v.toLocaleString(), ""]} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
                    <Bar dataKey="dau" fill="#5e8fff" name="DAU" radius={[6, 6, 0, 0]} barSize={28} yAxisId="left" />
                    <Bar dataKey="nru" fill="#ffb3d9" name="New Users" radius={[6, 6, 0, 0]} barSize={14} yAxisId="right" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* PieChart: Platform split */}
          <div className="col-span-2">
            <ChartCard title="Platform Distribution" subtitle="Revenue by platform · Last 7 days">
              <div className="h-64 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="40%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {platformData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ left: "40%", transform: "translateX(-50%)", width: "40%" }}>
                  <div className="font-mono text-2xl font-bold text-[#1f1f1f]">45%</div>
                  <div className="text-xs text-[#9aa0a6] font-medium">iOS</div>
                </div>
                {/* Legend */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-3">
                  {platformData.map((p) => (
                    <div key={p.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                      <div>
                        <div className="text-xs font-semibold text-[#1f1f1f]">{p.value}%</div>
                        <div className="text-[10px] text-[#9aa0a6]">{p.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Region breakdown below */}
              <div className="mt-2 pt-4 border-t border-[#f1f3f4]">
                <div className="text-xs text-[#9aa0a6] uppercase tracking-widest font-semibold mb-3">Revenue by Region</div>
                <div className="grid grid-cols-4 gap-2">
                  {regionData.map((r) => (
                    <div key={r.name} className="text-center">
                      <div className="w-full h-1.5 rounded-full mb-1.5" style={{ backgroundColor: r.color }} />
                      <div className="font-mono text-sm font-bold text-[#1f1f1f]">{r.value}%</div>
                      <div className="text-[10px] text-[#9aa0a6]">{r.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>
          </div>
        </div>

        {/* ── Row 3: ScatterChart + RadarChart ────────────────────────────── */}
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* ScatterChart: Bubble – Retention vs Revenue */}
          <ChartCard title="Game Portfolio Map" subtitle="D7 Retention (X) vs Daily Revenue (Y) · bubble = DAU">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" />
                  <XAxis
                    type="number" dataKey="x" name="D7 Retention" unit="%" domain={[55, 85]}
                    {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }}
                    label={{ value: "D7 Retention (%)", position: "insideBottom", offset: -2, fontSize: 11, fill: "#9aa0a6" }}
                  />
                  <YAxis
                    type="number" dataKey="y" name="Revenue" unit="k"
                    {...AXIS_PROPS} axisLine={false}
                    label={{ value: "Revenue ($k)", angle: -90, position: "insideLeft", fontSize: 11, fill: "#9aa0a6" }}
                  />
                  <ZAxis type="number" dataKey="z" range={[300, 1800]} />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(v: number, name) => [
                      name === "D7 Retention" ? `${v}%` : name === "Revenue" ? `$${v}k` : v.toLocaleString(),
                      name
                    ]}
                  />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
                  {bubbleGames.map((game) => (
                    <Scatter
                      key={game.name}
                      name={game.name}
                      data={[{ x: game.x, y: game.y, z: game.z }]}
                      fill={game.color}
                      shape={(p: Record<string, unknown>) => <CustomScatterDot {...(p as Parameters<typeof CustomScatterDot>[0])} payload={game} fill={game.color} />}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* RadarChart: Game health — top 2 games */}
          <ChartCard title="Game Health Radar" subtitle="Multi-dimensional comparison · Stellar Quest vs Ocean Voyage">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={90}>
                  <PolarGrid stroke="#e8eaed" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#9aa0a6" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Stellar Quest" dataKey="stellar" stroke="#5e8fff" fill="#5e8fff" fillOpacity={0.25} strokeWidth={2} />
                  <Radar name="Ocean Voyage" dataKey="ocean" stroke="#ffb3d9" fill="#ffb3d9" fillOpacity={0.25} strokeWidth={2} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* ── Insight Callout ──────────────────────────────────────────────── */}
        <div className="mt-5 bg-[#d4ff00] rounded-3xl p-8">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-[#1f1f1f] rounded-3xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-[#d4ff00]" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-[#5f6368] font-semibold mb-2">AI Signal · Today</div>
              <h3 className="text-[#1f1f1f] mb-2">Revenue outpacing forecast by $62k — weekend momentum persists</h3>
              <p className="text-sm text-[#1f1f1f] leading-relaxed opacity-80 max-w-2xl">
                Stellar Quest's Day-7 retention climbed to <span className="font-mono font-bold">76%</span> (+4pp WoW), driving the strongest ARPDAU in 6 weeks.
                European markets show <span className="font-mono font-bold">+15%</span> WoW — consider EU-targeted campaigns next cycle.
              </p>
              <div className="flex gap-3 mt-4">
                <button className="px-5 py-2.5 bg-[#1f1f1f] text-white rounded-full text-sm hover:bg-[#3c4043] transition-colors font-medium">
                  View Watchtower
                </button>
                <button className="px-5 py-2.5 border border-[#1f1f1f] text-[#1f1f1f] rounded-full text-sm hover:bg-black/5 transition-colors font-medium">
                  Open AI Chat
                </button>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs text-[#5f6368] font-mono mb-1">Confidence</div>
              <div className="text-2xl font-mono font-bold text-[#1f1f1f]">87%</div>
              <div className="text-xs text-[#5f6368] mt-0.5">High</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}