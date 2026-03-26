import { useState } from "react";
import { TrendingUp, TrendingDown, Filter, SlidersHorizontal } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────────
type TabKey = "growth" | "retention" | "monetization" | "engagement";

// ── Data ──────────────────────────────────────────────────────────────────────

const growthData = [
  { date: "Mar 1",  dau: 16800, nru: 1820, mau: 55200 },
  { date: "Mar 5",  dau: 17600, nru: 2010, mau: 57100 },
  { date: "Mar 10", dau: 18900, nru: 2240, mau: 59400 },
  { date: "Mar 15", dau: 19800, nru: 2390, mau: 61200 },
  { date: "Mar 20", dau: 21200, nru: 2580, mau: 63100 },
  { date: "Mar 25", dau: 22100, nru: 2820, mau: 64200 },
];

const retentionBars = [
  { game: "Stellar Quest", d1: 62, d7: 76, d14: 54, d30: 41 },
  { game: "Ocean Voyage",  d1: 58, d7: 68, d14: 48, d30: 36 },
  { game: "Mystery Tower", d1: 60, d7: 72, d14: 51, d30: 39 },
  { game: "Dragon Empire", d1: 54, d7: 64, d14: 44, d30: 32 },
];

const retentionTrend = [
  { week: "W8",  d7: 62, d14: 46, d30: 35 },
  { week: "W9",  d7: 64, d14: 48, d30: 36 },
  { week: "W10", d7: 66, d14: 50, d30: 37 },
  { week: "W11", d7: 68, d14: 52, d30: 38 },
  { week: "W12", d7: 68, d14: 54, d30: 41 },
];

const monetizationData = [
  { date: "Mar 12", revenue: 312, arpdau: 3.8 },
  { date: "Mar 14", revenue: 325, arpdau: 3.9 },
  { date: "Mar 16", revenue: 368, arpdau: 4.1 },
  { date: "Mar 18", revenue: 395, arpdau: 4.3 },
  { date: "Mar 20", revenue: 412, arpdau: 4.5 },
  { date: "Mar 22", revenue: 432, arpdau: 4.6 },
  { date: "Mar 24", revenue: 445, arpdau: 4.8 },
];

const monetizationByGame = [
  { game: "Stellar Quest", revenue: 145, arpdau: 4.23 },
  { game: "Ocean Voyage",  revenue: 132, arpdau: 3.84 },
  { game: "Mystery Tower", revenue: 99,  arpdau: 3.62 },
  { game: "Dragon Empire", revenue: 69,  arpdau: 2.91 },
];

const engagementData = [
  { time: "00:00", sessions: 8200,  avgDuration: 18 },
  { time: "04:00", sessions: 5400,  avgDuration: 14 },
  { time: "08:00", sessions: 12600, avgDuration: 22 },
  { time: "12:00", sessions: 19800, avgDuration: 26 },
  { time: "16:00", sessions: 24200, avgDuration: 29 },
  { time: "20:00", sessions: 28900, avgDuration: 32 },
  { time: "23:00", sessions: 21400, avgDuration: 27 },
];

const featureEngagement = [
  { feature: "Daily Quest",     usage: 84 },
  { feature: "Guild Battle",    usage: 71 },
  { feature: "Gacha Pull",      usage: 63 },
  { feature: "Ranked Match",    usage: 58 },
  { feature: "Story Mode",      usage: 49 },
  { feature: "Social Gifting",  usage: 38 },
];

const TOOLTIP_STYLE = {
  backgroundColor: "#ffffff",
  border: "1px solid #e8eaed",
  borderRadius: "16px",
  fontSize: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

const AXIS_PROPS = { stroke: "#9aa0a6", fontSize: 11, tickLine: false as const };

// ── Tabs Config ────────────────────────────────────────────────────────────────

const TABS: { key: TabKey; label: string; color: string; kpis: { label: string; value: string; delta: string; up: boolean }[] }[] = [
  {
    key: "growth",
    label: "Growth",
    color: "#5e8fff",
    kpis: [
      { label: "DAU", value: "22,100", delta: "+8.2%", up: true },
      { label: "MAU", value: "64,200", delta: "+5.1%", up: true },
      { label: "DAU / MAU", value: "34.4%", delta: "+0.9pp", up: true },
      { label: "NRU", value: "2,820",  delta: "+12.4%", up: true },
    ],
  },
  {
    key: "retention",
    label: "Retention",
    color: "#00f5a0",
    kpis: [
      { label: "D1 Avg", value: "59.3%", delta: "+1.2pp", up: true },
      { label: "D7 Avg", value: "68.4%", delta: "+2.1pp", up: true },
      { label: "D14 Avg", value: "51.8%", delta: "+1.5pp", up: true },
      { label: "D30 Avg", value: "37.0%", delta: "-0.3pp", up: false },
    ],
  },
  {
    key: "monetization",
    label: "Monetization",
    color: "#ff8c69",
    kpis: [
      { label: "Daily Revenue", value: "$462k",  delta: "+12.4%", up: true },
      { label: "ARPDAU",        value: "$4.82",   delta: "+$0.18", up: true },
      { label: "Conversion",    value: "7.0%",    delta: "-0.1pp", up: false },
      { label: "LTV 30d",       value: "$18.40",  delta: "+$1.20", up: true },
    ],
  },
  {
    key: "engagement",
    label: "Engagement",
    color: "#b8a3ff",
    kpis: [
      { label: "Avg Session",   value: "28m 14s", delta: "+4.2%",  up: true },
      { label: "Sessions/User", value: "3.8",      delta: "+0.4",   up: true },
      { label: "Feature Usage", value: "84%",      delta: "+3pp",   up: true },
      { label: "Churn Rate",    value: "2.1%",     delta: "-0.3pp", up: true },
    ],
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function KpiChip({ label, value, delta, up }: { label: string; value: string; delta: string; up: boolean }) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 border border-[#e8eaed]">
      <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">{label}</div>
      <div className="font-mono text-xl font-bold text-[#1f1f1f] mb-1">{value}</div>
      <div className={`flex items-center gap-1 text-xs font-mono font-semibold ${up ? "text-[#1a7a4a]" : "text-[#c0392b]"}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {delta}
      </div>
    </div>
  );
}

// ── Tab content ─────────────────────────────────────────────────────────────

function GrowthView() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs text-[#9aa0a6] font-medium mb-2">DAU & MAU Trend · Mar 1 – 25</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
              <XAxis dataKey="date" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
              <YAxis {...AXIS_PROPS} axisLine={false} yAxisId="left" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis {...AXIS_PROPS} axisLine={false} yAxisId="right" orientation="right" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [v.toLocaleString(), ""]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
              <Bar dataKey="nru" fill="#ffb3d9" name="NRU" radius={[4, 4, 0, 0]} barSize={16} yAxisId="right" />
              <Area type="monotone" dataKey="dau" stroke="#5e8fff" fill="#5e8fff1a" strokeWidth={2.5} name="DAU" dot={false} yAxisId="left" />
              <Line type="monotone" dataKey="mau" stroke="#00f5a0" strokeWidth={2} name="MAU" dot={false} yAxisId="left" strokeDasharray="6 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function RetentionView() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs text-[#9aa0a6] font-medium mb-2">Retention by Game (D1 / D7 / D14 / D30)</div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={retentionBars} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" horizontal={false} />
              <XAxis type="number" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} unit="%" domain={[0, 90]} />
              <YAxis type="category" dataKey="game" {...AXIS_PROPS} axisLine={false} width={100} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, ""]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
              <Bar dataKey="d1"  fill="#5e8fff" name="D1"  radius={[0, 4, 4, 0]} barSize={8} />
              <Bar dataKey="d7"  fill="#00f5a0" name="D7"  radius={[0, 4, 4, 0]} barSize={8} />
              <Bar dataKey="d14" fill="#ffb3d9" name="D14" radius={[0, 4, 4, 0]} barSize={8} />
              <Bar dataKey="d30" fill="#ff8c69" name="D30" radius={[0, 4, 4, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <div className="text-xs text-[#9aa0a6] font-medium mb-2">D7 / D14 / D30 Trend · Weekly</div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={retentionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
              <XAxis dataKey="week" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
              <YAxis {...AXIS_PROPS} axisLine={false} unit="%" />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, ""]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
              <Line type="monotone" dataKey="d7"  stroke="#5e8fff" strokeWidth={2.5} dot={{ r: 4, fill: "#5e8fff" }} name="D7" />
              <Line type="monotone" dataKey="d14" stroke="#00f5a0" strokeWidth={2.5} dot={{ r: 4, fill: "#00f5a0" }} name="D14" />
              <Line type="monotone" dataKey="d30" stroke="#ff8c69" strokeWidth={2.5} dot={{ r: 4, fill: "#ff8c69" }} name="D30" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MonetizationView() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs text-[#9aa0a6] font-medium mb-2">Daily Revenue & ARPDAU · Mar 12 – 24</div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monetizationData}>
              <defs>
                <linearGradient id="revMonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff8c69" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#ff8c69" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
              <XAxis dataKey="date" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
              <YAxis {...AXIS_PROPS} axisLine={false} yAxisId="left" tickFormatter={(v) => `$${v}k`} />
              <YAxis {...AXIS_PROPS} axisLine={false} yAxisId="right" orientation="right" tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
              <Area type="monotone" dataKey="revenue" stroke="#ff8c69" fill="url(#revMonGrad)" strokeWidth={2.5} name="Revenue ($k)" yAxisId="left" dot={false} />
              <Line type="monotone" dataKey="arpdau" stroke="#5e8fff" strokeWidth={2} name="ARPDAU ($)" yAxisId="right" dot={{ r: 4, fill: "#5e8fff" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <div className="text-xs text-[#9aa0a6] font-medium mb-3">Revenue by Game</div>
        <div className="space-y-2">
          {monetizationByGame.map((g) => (
            <div key={g.game} className="flex items-center gap-3">
              <div className="w-28 text-sm font-medium text-[#1f1f1f] flex-shrink-0">{g.game}</div>
              <div className="flex-1 bg-[#f1f3f4] rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#ff8c69]"
                  style={{ width: `${(g.revenue / 145) * 100}%` }}
                />
              </div>
              <div className="w-16 text-right font-mono text-sm font-semibold text-[#1f1f1f]">${g.revenue}k</div>
              <div className="w-20 text-right font-mono text-xs text-[#5f6368]">ARPDAU ${g.arpdau}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EngagementView() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs text-[#9aa0a6] font-medium mb-2">Sessions & Avg Duration by Hour of Day</div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
              <XAxis dataKey="time" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
              <YAxis {...AXIS_PROPS} axisLine={false} yAxisId="left" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis {...AXIS_PROPS} axisLine={false} yAxisId="right" orientation="right" unit="m" />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
              <Bar dataKey="sessions" fill="#b8a3ff" name="Sessions" radius={[4, 4, 0, 0]} barSize={24} yAxisId="left" />
              <Line type="monotone" dataKey="avgDuration" stroke="#ff8c69" strokeWidth={2.5} name="Avg Duration (min)" yAxisId="right" dot={{ r: 4, fill: "#ff8c69" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <div className="text-xs text-[#9aa0a6] font-medium mb-3">Feature Engagement Rate</div>
        <div className="space-y-2">
          {featureEngagement.map((f) => (
            <div key={f.feature} className="flex items-center gap-3">
              <div className="w-28 text-sm font-medium text-[#1f1f1f] flex-shrink-0">{f.feature}</div>
              <div className="flex-1 bg-[#f1f3f4] rounded-full h-2.5 overflow-hidden">
                <div className="h-full rounded-full bg-[#b8a3ff]" style={{ width: `${f.usage}%` }} />
              </div>
              <div className="w-10 text-right font-mono text-sm font-semibold text-[#1f1f1f]">{f.usage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function Reports() {
  const [activeTab, setActiveTab] = useState<TabKey>("growth");
  const tab = TABS.find((t) => t.key === activeTab)!;

  const renderContent = () => {
    if (activeTab === "growth") return <GrowthView />;
    if (activeTab === "retention") return <RetentionView />;
    if (activeTab === "monetization") return <MonetizationView />;
    return <EngagementView />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#e8eaed] px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Supporting Analysis</div>
            <h1 className="text-[#1f1f1f]">Reports</h1>
            <p className="text-sm text-[#5f6368] mt-0.5">
              Deep-dive analytics by category · Rectangles · Mar 25, 2026 · D-2 confirmed data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-[#e8eaed] text-[#5f6368] text-sm rounded-full hover:bg-[#f8f9fa] transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#e8eaed] text-[#5f6368] text-sm rounded-full hover:bg-[#f8f9fa] transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Compare
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-81px)]">
        {/* ── Main Analysis Area ──────────────────────────────────────────── */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {/* Tab nav */}
          <div className="flex gap-1 mb-6 bg-[#f8f9fa] p-1 rounded-2xl w-fit">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  activeTab === t.key
                    ? "bg-white text-[#1f1f1f] shadow-sm"
                    : "text-[#5f6368] hover:text-[#1f1f1f]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {tab.kpis.map((k) => (
              <KpiChip key={k.label} {...k} />
            ))}
          </div>

          {/* Chart area */}
          <div
            className="bg-white rounded-3xl p-6 border"
            style={{ borderColor: tab.color + "40" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tab.color }} />
              <h3 className="text-[#1f1f1f]">{tab.label} Analysis</h3>
              <div className="ml-auto font-mono text-xs text-[#9aa0a6]">Mar 25, 2026 · Rectangles</div>
            </div>
            {renderContent()}
          </div>
        </div>

        {/* ── Right Operator Panel ────────────────────────────────────────── */}
        <aside className="w-72 border-l border-[#e8eaed] flex-shrink-0 overflow-auto px-5 py-6">
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Quiet Operator Layer</div>
            <p className="text-sm text-[#1f1f1f] font-semibold leading-snug">
              Output and operation status confirm from this layer.
            </p>
            <p className="text-xs text-[#5f6368] mt-2 leading-relaxed">
              To not interfere with the watchtower reading, operation logs and delivery status remain in the supporting zone.
            </p>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold">Operations</div>
              <div className="text-xs text-[#5f6368] font-mono">Report 1 · New highlight pending</div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Weekly Briefing", status: "delivered", time: "09:00" },
                { label: "Daily Summary",   status: "delivered", time: "08:00" },
                { label: "Slack Alert",     status: "pending",   time: "--:--" },
              ].map((op) => (
                <div key={op.label} className="flex items-center justify-between py-2.5 border-b border-[#f1f3f4]">
                  <div>
                    <div className="text-sm font-medium text-[#1f1f1f]">{op.label}</div>
                    <div className="text-xs text-[#9aa0a6] font-mono">{op.time}</div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    op.status === "delivered"
                      ? "bg-[#e6f9f0] text-[#1a7a4a]"
                      : "bg-[#f8f9fa] text-[#9aa0a6]"
                  }`}>
                    {op.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-3">Data Freshness</div>
            <div className="space-y-3">
              {[
                { label: "GA4 Pipeline",      value: "D-2",    ok: true  },
                { label: "AdMob",             value: "Fallback", ok: false },
                { label: "Taxonomy",          value: "Synced", ok: true  },
                { label: "Delivery",          value: "09:00 KST", ok: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-[#5f6368]">{s.label}</span>
                  <span className={`text-xs font-mono font-semibold ${s.ok ? "text-[#1a7a4a]" : "text-[#c0392b]"}`}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-3">Signals</div>
            <div className="flex flex-wrap gap-1.5">
              {["GA4 Fallback", "D7 improving", "EU growth", "Weekend peak"].map((sig) => (
                <div key={sig} className="px-2.5 py-1 bg-[#f8f9fa] text-[#5f6368] text-[10px] font-mono rounded-full">
                  {sig}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-2">Missing Inputs</div>
              <div className="flex flex-wrap gap-1.5">
                {["funnel_steps", "admob_revenue"].map((m) => (
                  <div key={m} className="px-2.5 py-1 bg-[#fef0f0] text-[#c0392b] text-[10px] font-mono rounded-full">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
