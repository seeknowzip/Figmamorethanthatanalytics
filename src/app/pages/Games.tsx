import { useState } from "react";
import { TrendingUp, TrendingDown, Globe, ChevronRight } from "lucide-react";
import {
  ComposedChart, Bar, Area, Line,
  BarChart, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Game {
  id: string;
  name: string;
  genre: string;
  color: string;
  bgColor: string;
  kpis: { dau: string; revenue: string; d7: string; arpdau: string; dauDelta: string; revDelta: string; d7Delta: string };
  trend: { date: string; dau: number; revenue: number; nru: number }[];
  funnel: { stage: string; value: number; rate: string }[];
  cohorts: { label: string; d1: number; d7: number; d14: number; d30: number; d60: number | null }[];
  regions: { name: string; share: number; growth: number; color: string }[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const games: Game[] = [
  {
    id: "stellar",
    name: "Stellar Quest",
    genre: "RPG · Mobile",
    color: "#5e8fff",
    bgColor: "#eef4ff",
    kpis: {
      dau: "8,420", revenue: "$145k", d7: "76%", arpdau: "$4.23",
      dauDelta: "+11%", revDelta: "+18%", d7Delta: "+4pp",
    },
    trend: [
      { date: "Mar 12", dau: 7200, revenue: 118, nru: 840 },
      { date: "Mar 15", dau: 7680, revenue: 128, nru: 920 },
      { date: "Mar 18", dau: 8010, revenue: 136, nru: 980 },
      { date: "Mar 21", dau: 8220, revenue: 141, nru: 860 },
      { date: "Mar 25", dau: 8420, revenue: 145, nru: 910 },
    ],
    funnel: [
      { stage: "Store Impressions", value: 120000, rate: "100%" },
      { stage: "Store Visits",      value: 52000,  rate: "43.3%" },
      { stage: "Installs",          value: 21000,  rate: "40.4%" },
      { stage: "Registration",      value: 14200,  rate: "67.6%" },
      { stage: "First Session",     value: 11800,  rate: "83.1%" },
      { stage: "D7 Active",         value: 6400,   rate: "54.2%" },
      { stage: "Payer",             value: 840,    rate: "13.1%" },
    ],
    cohorts: [
      { label: "Mar 1",  d1: 62, d7: 76, d14: 54, d30: 41, d60: 28 },
      { label: "Mar 8",  d1: 63, d7: 74, d14: 52, d30: 39, d60: null },
      { label: "Mar 15", d1: 64, d7: 76, d14: 54, d30: null, d60: null },
      { label: "Mar 22", d1: 65, d7: null, d14: null, d30: null, d60: null },
    ],
    regions: [
      { name: "North America", share: 42, growth: 8,  color: "#5e8fff" },
      { name: "Europe",        share: 31, growth: 18, color: "#b8a3ff" },
      { name: "APAC",          share: 20, growth: 5,  color: "#00f5a0" },
      { name: "Others",        share: 7,  growth: 2,  color: "#ffb3d9" },
    ],
  },
  {
    id: "ocean",
    name: "Ocean Voyage",
    genre: "Casual · Mobile",
    color: "#ffb3d9",
    bgColor: "#fff5f9",
    kpis: {
      dau: "7,180", revenue: "$132k", d7: "68%", arpdau: "$3.84",
      dauDelta: "+6%", revDelta: "+9%", d7Delta: "+1pp",
    },
    trend: [
      { date: "Mar 12", dau: 6600, revenue: 115, nru: 720 },
      { date: "Mar 15", dau: 6780, revenue: 120, nru: 680 },
      { date: "Mar 18", dau: 6980, revenue: 126, nru: 710 },
      { date: "Mar 21", dau: 7100, revenue: 129, nru: 740 },
      { date: "Mar 25", dau: 7180, revenue: 132, nru: 780 },
    ],
    funnel: [
      { stage: "Store Impressions", value: 98000, rate: "100%" },
      { stage: "Store Visits",      value: 41000, rate: "41.8%" },
      { stage: "Installs",          value: 16800, rate: "41.0%" },
      { stage: "Registration",      value: 11200, rate: "66.7%" },
      { stage: "First Session",     value: 9400,  rate: "83.9%" },
      { stage: "D7 Active",         value: 4860,  rate: "51.7%" },
      { stage: "Payer",             value: 580,   rate: "11.9%" },
    ],
    cohorts: [
      { label: "Mar 1",  d1: 58, d7: 68, d14: 48, d30: 36, d60: 24 },
      { label: "Mar 8",  d1: 59, d7: 67, d14: 47, d30: 35, d60: null },
      { label: "Mar 15", d1: 60, d7: 68, d14: 48, d30: null, d60: null },
      { label: "Mar 22", d1: 61, d7: null, d14: null, d30: null, d60: null },
    ],
    regions: [
      { name: "North America", share: 38, growth: 5,  color: "#5e8fff" },
      { name: "Europe",        share: 28, growth: 12, color: "#b8a3ff" },
      { name: "APAC",          share: 25, growth: 8,  color: "#00f5a0" },
      { name: "Others",        share: 9,  growth: 3,  color: "#ffb3d9" },
    ],
  },
  {
    id: "mystery",
    name: "Mystery Tower",
    genre: "Puzzle · Multi-platform",
    color: "#00f5a0",
    bgColor: "#eafff8",
    kpis: {
      dau: "5,340", revenue: "$99k", d7: "72%", arpdau: "$3.62",
      dauDelta: "+4%", revDelta: "+7%", d7Delta: "+2pp",
    },
    trend: [
      { date: "Mar 12", dau: 4980, revenue: 88, nru: 540 },
      { date: "Mar 15", dau: 5060, revenue: 91, nru: 520 },
      { date: "Mar 18", dau: 5180, revenue: 94, nru: 560 },
      { date: "Mar 21", dau: 5280, revenue: 97, nru: 580 },
      { date: "Mar 25", dau: 5340, revenue: 99, nru: 600 },
    ],
    funnel: [
      { stage: "Store Impressions", value: 76000, rate: "100%" },
      { stage: "Store Visits",      value: 32000, rate: "42.1%" },
      { stage: "Installs",          value: 13200, rate: "41.3%" },
      { stage: "Registration",      value: 9100,  rate: "68.9%" },
      { stage: "First Session",     value: 7800,  rate: "85.7%" },
      { stage: "D7 Active",         value: 4600,  rate: "59.0%" },
      { stage: "Payer",             value: 620,   rate: "13.5%" },
    ],
    cohorts: [
      { label: "Mar 1",  d1: 60, d7: 72, d14: 51, d30: 39, d60: 26 },
      { label: "Mar 8",  d1: 61, d7: 71, d14: 50, d30: 38, d60: null },
      { label: "Mar 15", d1: 62, d7: 72, d14: 51, d30: null, d60: null },
      { label: "Mar 22", d1: 63, d7: null, d14: null, d30: null, d60: null },
    ],
    regions: [
      { name: "North America", share: 35, growth: 4,  color: "#5e8fff" },
      { name: "Europe",        share: 42, growth: 10, color: "#b8a3ff" },
      { name: "APAC",          share: 16, growth: 3,  color: "#00f5a0" },
      { name: "Others",        share: 7,  growth: 1,  color: "#ffb3d9" },
    ],
  },
  {
    id: "dragon",
    name: "Dragon Empire",
    genre: "Strategy · Mobile",
    color: "#ff8c69",
    bgColor: "#fff5f2",
    kpis: {
      dau: "3,980", revenue: "$69k", d7: "64%", arpdau: "$2.91",
      dauDelta: "+2%", revDelta: "+4%", d7Delta: "-1pp",
    },
    trend: [
      { date: "Mar 12", dau: 3820, revenue: 63, nru: 380 },
      { date: "Mar 15", dau: 3860, revenue: 65, nru: 360 },
      { date: "Mar 18", dau: 3900, revenue: 67, nru: 390 },
      { date: "Mar 21", dau: 3940, revenue: 68, nru: 370 },
      { date: "Mar 25", dau: 3980, revenue: 69, nru: 400 },
    ],
    funnel: [
      { stage: "Store Impressions", value: 54000, rate: "100%" },
      { stage: "Store Visits",      value: 21000, rate: "38.9%" },
      { stage: "Installs",          value: 8400,  rate: "40.0%" },
      { stage: "Registration",      value: 5600,  rate: "66.7%" },
      { stage: "First Session",     value: 4800,  rate: "85.7%" },
      { stage: "D7 Active",         value: 2560,  rate: "53.3%" },
      { stage: "Payer",             value: 310,   rate: "12.1%" },
    ],
    cohorts: [
      { label: "Mar 1",  d1: 54, d7: 64, d14: 44, d30: 32, d60: 21 },
      { label: "Mar 8",  d1: 54, d7: 63, d14: 43, d30: 31, d60: null },
      { label: "Mar 15", d1: 55, d7: 64, d14: 44, d30: null, d60: null },
      { label: "Mar 22", d1: 55, d7: null, d14: null, d30: null, d60: null },
    ],
    regions: [
      { name: "North America", share: 30, growth: 2,  color: "#5e8fff" },
      { name: "Europe",        share: 22, growth: 6,  color: "#b8a3ff" },
      { name: "APAC",          share: 38, growth: 4,  color: "#00f5a0" },
      { name: "Others",        share: 10, growth: 1,  color: "#ffb3d9" },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
  backgroundColor: "#ffffff",
  border: "1px solid #e8eaed",
  borderRadius: "16px",
  fontSize: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

const AXIS_PROPS = { stroke: "#9aa0a6", fontSize: 11, tickLine: false as const };

function getRetentionStyle(value: number | null): { bg: string; text: string } {
  if (value === null) return { bg: "#f8f9fa", text: "#c5cad0" };
  if (value === 100) return { bg: "#5e8fff", text: "#ffffff" };
  if (value >= 60)   return { bg: "#7ba3ff", text: "#ffffff" };
  if (value >= 45)   return { bg: "#a8c4ff", text: "#1f1f1f" };
  if (value >= 30)   return { bg: "#00f5a0", text: "#1f1f1f" };
  if (value >= 20)   return { bg: "#86ffd7", text: "#1f1f1f" };
  return               { bg: "#d2f5e8", text: "#5f6368" };
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function KpiChip({
  label, value, delta, isUp, color,
}: { label: string; value: string; delta: string; isUp: boolean; color: string }) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 border border-[#e8eaed]">
      <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">{label}</div>
      <div className="font-mono text-xl font-bold text-[#1f1f1f] mb-1">{value}</div>
      <div className={`flex items-center gap-1 text-xs font-mono font-semibold ${isUp ? "text-[#1a7a4a]" : "text-[#c0392b]"}`}>
        {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {delta} WoW
      </div>
    </div>
  );
}

function FunnelBar({ stage, value, rate, maxValue, color }: {
  stage: string; value: number; rate: string; maxValue: number; color: string;
}) {
  const pct = (value / maxValue) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 text-xs font-medium text-[#5f6368] text-right flex-shrink-0">{stage}</div>
      <div className="flex-1 h-7 bg-[#f1f3f4] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        >
          <span className="text-xs font-mono font-bold text-white drop-shadow-sm">
            {value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
          </span>
        </div>
      </div>
      <div className="w-12 text-right text-xs font-mono text-[#5f6368] flex-shrink-0">{rate}</div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function Games() {
  const [selectedId, setSelectedId] = useState<string>(games[0].id);
  const game = games.find((g) => g.id === selectedId)!;
  const { kpis, trend, funnel, cohorts, regions } = game;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#e8eaed] px-8 py-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Operators</div>
            <h1 className="text-[#1f1f1f]">Game Portfolio</h1>
            <p className="text-sm text-[#5f6368] mt-0.5">Per-game analytics, conversion funnels and cohort retention · Mar 25, 2026</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] text-white text-sm rounded-full hover:bg-[#3c4043] transition-colors font-medium">
            <ChevronRight className="w-3.5 h-3.5" />
            Create draft
          </button>
        </div>
      </div>

      <div className="flex">
        {/* ── Left: Game selector ─────────────────────────────────────── */}
        <aside className="w-56 border-r border-[#e8eaed] flex-shrink-0 px-3 py-4 min-h-[calc(100vh-81px)]">
          <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-3 px-2">Drafts</div>
          <div className="space-y-1">
            {games.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedId(g.id)}
                className={`w-full text-left px-3 py-3 rounded-2xl transition-all duration-150 ${
                  g.id === selectedId
                    ? "text-[#1f1f1f] shadow-sm"
                    : "hover:bg-[#f8f9fa]"
                }`}
                style={g.id === selectedId ? { backgroundColor: g.bgColor, borderLeft: `3px solid ${g.color}` } : {}}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: g.color }} />
                  <span className="text-sm font-semibold text-[#1f1f1f]">{g.name}</span>
                </div>
                <div className="text-xs text-[#9aa0a6] pl-4">{g.genre}</div>
              </button>
            ))}
          </div>
          <div className="mt-6 px-3">
            <div className="bg-[#f8f9fa] rounded-2xl p-3 border border-[#e8eaed]">
              <p className="text-xs text-[#5f6368] leading-relaxed">
                아직 생성된 온보딩 드래프트가 없습니다.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Right: Game detail ──────────────────────────────────────── */}
        <div className="flex-1 px-8 py-6 overflow-auto">
          {/* Game header */}
          <div
            className="rounded-3xl px-6 py-5 mb-6"
            style={{ backgroundColor: game.bgColor }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: game.color }} />
              <span className="text-xs font-medium text-[#5f6368]">{game.genre}</span>
            </div>
            <h2 className="text-[#1f1f1f] mb-1">{game.name}</h2>
            <p className="text-sm text-[#5f6368]">Mar 25, 2026 · Rectangles · D-2 confirmed</p>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <KpiChip label="DAU" value={kpis.dau} delta={kpis.dauDelta} isUp color={game.color} />
            <KpiChip label="Daily Revenue" value={kpis.revenue} delta={kpis.revDelta} isUp color={game.color} />
            <KpiChip label="D7 Retention" value={kpis.d7} delta={kpis.d7Delta} isUp={!kpis.d7Delta.startsWith("-")} color={game.color} />
            <KpiChip label="ARPDAU" value={kpis.arpdau} delta="+WoW" isUp color={game.color} />
          </div>

          {/* Row 1: Trend Chart + Funnel */}
          <div className="grid grid-cols-5 gap-5 mb-5">
            {/* ComposedChart */}
            <div className="col-span-3 bg-white rounded-3xl p-6 border border-[#e8eaed]">
              <h3 className="text-[#1f1f1f] mb-1">DAU & Revenue Trend</h3>
              <p className="text-xs text-[#9aa0a6] mb-5">Bi-weekly · Mar 12 – Mar 25</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
                    <XAxis dataKey="date" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
                    <YAxis {...AXIS_PROPS} axisLine={false} yAxisId="left" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <YAxis {...AXIS_PROPS} axisLine={false} yAxisId="right" orientation="right" tickFormatter={(v) => `$${v}k`} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
                    <Bar dataKey="nru" fill="#ffb3d9" name="NRU" radius={[4, 4, 0, 0]} barSize={12} yAxisId="right" />
                    <Area
                      type="monotone" dataKey="dau" name="DAU"
                      stroke={game.color} fill={game.color + "1a"} strokeWidth={2.5}
                      dot={false} yAxisId="left"
                    />
                    <Line
                      type="monotone" dataKey="revenue" name="Revenue ($k)"
                      stroke="#ff8c69" strokeWidth={2} dot={{ r: 4, fill: "#ff8c69" }} yAxisId="right"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Funnel */}
            <div className="col-span-2 bg-white rounded-3xl p-6 border border-[#e8eaed]">
              <h3 className="text-[#1f1f1f] mb-1">Acquisition Funnel</h3>
              <p className="text-xs text-[#9aa0a6] mb-5">Impression → Payer · Last 30d</p>
              <div className="space-y-2">
                {funnel.map((step) => (
                  <FunnelBar
                    key={step.stage}
                    stage={step.stage}
                    value={step.value}
                    rate={step.rate}
                    maxValue={funnel[0].value}
                    color={game.color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Retention Cohort Heatmap */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8eaed] mb-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[#1f1f1f] mb-0.5">Cohort Retention Heatmap</h3>
                <p className="text-xs text-[#9aa0a6]">% of users returning by day · Install cohorts</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#5e8fff]" />
                  <span className="text-xs text-[#5f6368]">≥60%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#00f5a0]" />
                  <span className="text-xs text-[#5f6368]">30–60%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#d2f5e8]" />
                  <span className="text-xs text-[#5f6368]">{"<30%"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#f8f9fa]" />
                  <span className="text-xs text-[#5f6368]">No data</span>
                </div>
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold pb-3 pr-4 w-24">Cohort</th>
                  {["D1", "D7", "D14", "D30", "D60"].map((d) => (
                    <th key={d} className="text-center text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold pb-3 px-2">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map((cohort) => {
                  const cells = [100, cohort.d7, cohort.d14, cohort.d30, cohort.d60];
                  return (
                    <tr key={cohort.label}>
                      <td className="text-xs font-mono text-[#5f6368] py-1.5 pr-4">{cohort.label}</td>
                      {cells.map((val, ci) => {
                        const style = getRetentionStyle(val);
                        return (
                          <td key={ci} className="px-2 py-1.5">
                            <div
                              className="h-9 rounded-xl flex items-center justify-center mx-auto font-mono text-xs font-semibold transition-all duration-200 hover:scale-105 cursor-default"
                              style={{
                                backgroundColor: style.bg,
                                color: style.text,
                                minWidth: "52px",
                              }}
                            >
                              {val !== null ? `${val}%` : "—"}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Row 3: Regional Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8eaed]">
            <div className="flex items-center gap-2 mb-5">
              <Globe className="w-4 h-4 text-[#9aa0a6]" />
              <h3 className="text-[#1f1f1f]">Revenue by Region</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regions} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" horizontal={false} />
                  <XAxis type="number" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} unit="%" domain={[0, 50]} />
                  <YAxis type="category" dataKey="name" {...AXIS_PROPS} axisLine={false} width={110} />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v: number, name) => [`${v}%`, name === "share" ? "Revenue Share" : "Growth WoW"]}
                  />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
                  <Bar dataKey="share" name="Revenue Share" radius={[0, 8, 8, 0]} barSize={14}>
                    {regions.map((r) => (
                      <Cell key={r.name} fill={r.color} />
                    ))}
                  </Bar>
                  <Bar dataKey="growth" name="Growth WoW" fill="#f1f3f4" radius={[0, 8, 8, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}