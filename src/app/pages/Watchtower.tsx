import { useState } from "react";
import { Calendar, ChevronRight, AlertTriangle, Eye, Zap, CheckCircle } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type StatusLevel = "STABLE" | "WATCH" | "RISK" | "ALERT";

interface PillarStatus {
  label: string;
  status: StatusLevel;
  note: string;
}

interface WatchItem {
  priority: number;
  timing: "TODAY" | "THIS WEEK";
  text: string;
  tags: string[];
}

interface ConfidenceNote {
  level: "WARNING" | "INFO";
  category: string;
  note: string;
}

interface Briefing {
  id: string;
  date: string;
  displayDate: string;
  time: string;
  statusBadge: "성공" | "검토" | "위험";
  headline: string;
  summary: string;
  posture: string;
  pillars: PillarStatus[];
  topRisk: { title: string; status: StatusLevel; detail: string; why: string };
  watchItems: WatchItem[];
  confidence: ConfidenceNote[];
  signals: { confirmed: string[]; missing: string[] };
}

// ── Data ──────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<StatusLevel, { bg: string; text: string; border: string }> = {
  STABLE: { bg: "#e6f9f0", text: "#1a7a4a", border: "#a8e6c8" },
  WATCH:  { bg: "#fef9e6", text: "#92610a", border: "#f5d98a" },
  RISK:   { bg: "#fef0f0", text: "#c0392b", border: "#f5a8a8" },
  ALERT:  { bg: "#2c0a0a", text: "#ff6b6b", border: "#c0392b" },
};

const briefings: Briefing[] = [
  {
    id: "b-20260326",
    date: "2026-03-26",
    displayDate: "March 26, 2026",
    time: "09:02",
    statusBadge: "성공",
    headline: "Stability Without Growth Is the Real Risk Today.",
    summary: "Core metrics have remained within 2-week norms for the past 3 days. No anomalies — but flat isn't forward.",
    posture: "Base data is D-2 confirmed.",
    pillars: [
      { label: "Retention",    status: "STABLE", note: "No notable anomalies." },
      { label: "Engagement",   status: "WATCH",  note: "DAU data confirm needed vs 7d avg." },
      { label: "Monetization", status: "STABLE", note: "No notable anomalies." },
    ],
    topRisk: {
      title: "DAU data confirmation needed vs 7d avg",
      status: "WATCH",
      detail: "Core metrics have remained within 2-week norms. Today is better spent on strategy than alarm response.",
      why: "Today is a good day to focus on strategy and experiment validation rather than reactive alarm management.",
    },
    watchItems: [
      { priority: 1, timing: "TODAY", text: "Confirm stability anomalies are reproducible — document maintenance conditions and verify DAU baseline.", tags: ["Analyst", "DAU · D1 Retention"] },
      { priority: 2, timing: "TODAY", text: "Confirm stability anomalies are reproducible — document maintenance conditions and verify DAU baseline.", tags: ["PM", "DAU · D1 Retention"] },
      { priority: 3, timing: "TODAY", text: "Confirm stability anomalies are reproducible — document maintenance conditions and verify DAU baseline.", tags: ["Analyst", "DAU · D1 Retention"] },
    ],
    confidence: [
      { level: "WARNING", category: "monetization", note: "No AdMob data — using GA4 Fallback proxy for monetization metrics." },
      { level: "WARNING", category: "activation_friction", note: "Funnel step data confirmation needed." },
    ],
    signals: {
      confirmed: ["수익화 GA4 Fallback", "taxonomy unknown"],
      missing: ["funnel_steps_missing", "report_source:generated"],
    },
  },
  {
    id: "b-20260325",
    date: "2026-03-25",
    displayDate: "March 25, 2026",
    time: "09:15",
    statusBadge: "성공",
    headline: "Weekend Revenue Surge — Stellar Quest Leading the Pack.",
    summary: "Saturday performance exceeded forecast by 18%. Stellar Quest D7 retention reached 76%, the highest in 6 weeks.",
    posture: "Base data is D-2 confirmed.",
    pillars: [
      { label: "Retention",    status: "STABLE", note: "Stellar Quest D7 at 76% — 6-week high." },
      { label: "Engagement",   status: "STABLE", note: "Session duration up 4.2% WoW." },
      { label: "Monetization", status: "STABLE", note: "Revenue $462k — +$62k vs forecast." },
    ],
    topRisk: {
      title: "Mobile conversion advantage — desktop lagging",
      status: "WATCH",
      detail: "Mobile conversion exceeded desktop by 24% during weekend peak hours (18:00–22:00). Desktop experience may need optimization.",
      why: "The conversion gap is widening — if not addressed, desktop ARPDAU will continue to underperform.",
    },
    watchItems: [
      { priority: 1, timing: "TODAY", text: "Audit desktop conversion funnel for friction points during peak hours. Compare with mobile flow.", tags: ["PM", "Conversion · Desktop"] },
      { priority: 2, timing: "TODAY", text: "Prepare weekend promotional continuation strategy for the next 3-day period.", tags: ["Marketing", "Revenue · Promo"] },
      { priority: 3, timing: "THIS WEEK", text: "Expand European market campaign — EU revenue +15% WoW, DACH showing strongest signals.", tags: ["Growth", "EU · DACH"] },
    ],
    confidence: [
      { level: "INFO", category: "data_quality", note: "All primary data sources confirmed. AdMob normalized via GA4 proxy." },
    ],
    signals: {
      confirmed: ["GA4 Primary", "Taxonomy synced", "Weekend premium"],
      missing: ["admob_direct"],
    },
  },
  {
    id: "b-20260318",
    date: "2026-03-18",
    displayDate: "March 18, 2026",
    time: "09:20",
    statusBadge: "검토",
    headline: "Mobile Platform Gains — Conversion Rate Sets New Weekly High.",
    summary: "Mobile conversion exceeded desktop for the first time. Steady underlying growth but MAU growth decelerating.",
    posture: "Base data is D-2 confirmed. AdMob fallback active.",
    pillars: [
      { label: "Retention",    status: "STABLE", note: "D7 at 66% — in-range." },
      { label: "Engagement",   status: "WATCH",  note: "MAU growth decelerating — watch cohort quality." },
      { label: "Monetization", status: "STABLE", note: "Revenue $396k. Conversion new high." },
    ],
    topRisk: {
      title: "MAU growth deceleration vs NRU plateau",
      status: "WATCH",
      detail: "While DAU is growing, MAU growth rate slowed from 5.1% to 3.8% WoW. New user quality may be declining.",
      why: "If NRU cohort quality doesn't improve, D30 retention will drop and LTV projections will need revision.",
    },
    watchItems: [
      { priority: 1, timing: "TODAY", text: "Audit NRU cohort quality — compare D1 retention of recent cohorts vs baseline cohorts.", tags: ["Analyst", "NRU · D1 Retention"] },
    ],
    confidence: [
      { level: "WARNING", category: "monetization", note: "AdMob data unavailable — using GA4 proxy." },
    ],
    signals: {
      confirmed: ["GA4 Fallback", "Mobile conversion record"],
      missing: ["admob_revenue", "cohort_quality_score"],
    },
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: StatusLevel }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      {status}
    </span>
  );
}

function ArchiveItem({ b, selected, onClick }: { b: Briefing; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-3.5 rounded-2xl transition-all duration-150 ${
        selected ? "bg-[#5e8fff] text-white" : "hover:bg-[#f8f9fa] text-[#1f1f1f]"
      }`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className={`font-mono text-sm font-semibold ${selected ? "text-white" : "text-[#1f1f1f]"}`}>
          {b.date}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          selected
            ? "bg-white/20 text-white"
            : b.statusBadge === "성공"
              ? "bg-[#e6f9f0] text-[#1a7a4a]"
              : b.statusBadge === "검토"
                ? "bg-[#fef9e6] text-[#92610a]"
                : "bg-[#fef0f0] text-[#c0392b]"
        }`}>
          {b.statusBadge}
        </span>
      </div>
      <p className={`text-xs leading-relaxed line-clamp-3 ${selected ? "text-white/80" : "text-[#5f6368]"}`}>
        {b.headline} {b.summary}
      </p>
    </button>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function Watchtower() {
  const [selectedId, setSelectedId] = useState(briefings[0].id);
  const briefing = briefings.find((b) => b.id === selectedId)!;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="border-b border-[#e8eaed] px-8 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 text-sm text-[#5f6368]">
          <span className="font-semibold text-[#1f1f1f]">Rectangles</span>
          <span className="text-[#d0d3d9]">·</span>
          <span className="font-mono">{briefing.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#e8eaed] text-[#5f6368] text-sm rounded-full hover:bg-[#f8f9fa] transition-colors">
            <Calendar className="w-3.5 h-3.5" />
            {briefing.displayDate}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] text-white text-sm rounded-full hover:bg-[#3c4043] transition-colors font-medium">
            브리핑 생성
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: Archive Sidebar ──────────────────────────────────────── */}
        <aside className="w-56 border-r border-[#e8eaed] flex-shrink-0 flex flex-col overflow-hidden">
          <div className="px-4 pt-5 pb-3 border-b border-[#e8eaed] flex-shrink-0">
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-0.5">Archive</div>
            <div className="flex items-center justify-between">
              <h3 className="text-[#1f1f1f]">Briefings</h3>
              <div className="w-5 h-5 bg-[#f1f3f4] rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#5f6368]">{briefings.length}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-3 py-3 space-y-1">
            {briefings.map((b) => (
              <ArchiveItem
                key={b.id}
                b={b}
                selected={b.id === selectedId}
                onClick={() => setSelectedId(b.id)}
              />
            ))}
          </div>
        </aside>

        {/* ── Right: Main Content ────────────────────────────────────────── */}
        <div className="flex-1 overflow-auto">
          {/* Hero Card (Blue) */}
          <div className="bg-[#5e8fff] px-8 pt-8 pb-0 relative">
            <div className="flex items-start gap-3 mb-3">
              <div className="px-3 py-1 bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {briefing.date} · {briefing.time}
              </div>
              <StatusBadge status={briefing.pillars[0].status === "STABLE" && briefing.pillars[1].status === "STABLE" ? "STABLE" : "WATCH"} />
            </div>

            <div className="flex items-start gap-8 mb-6">
              <div className="flex-1">
                <h1
                  className="text-white mb-3"
                  style={{ fontSize: "2.5rem", lineHeight: "1.15", fontWeight: 700, letterSpacing: "-0.03em", maxWidth: "620px" }}
                >
                  {briefing.headline}
                </h1>
                <p className="text-white/75 text-base leading-relaxed max-w-xl">
                  {briefing.summary}
                </p>
              </div>
              {/* Top Risks summary */}
              <div className="flex-shrink-0 w-52 bg-white/10 rounded-3xl p-4 backdrop-blur-sm">
                <div className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-2">Top Risk</div>
                <div className="text-white font-semibold text-sm leading-snug mb-2">
                  {briefing.topRisk.title}
                </div>
                <StatusBadge status={briefing.topRisk.status} />
              </div>
            </div>

            {/* Briefing posture */}
            <div className="mb-6 bg-white/10 rounded-2xl px-4 py-2.5 inline-block">
              <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mr-3">Briefing Posture</span>
              <span className="text-white/90 text-sm">{briefing.posture}</span>
            </div>

            {/* Pillar status — slide up into white area */}
            <div className="grid grid-cols-3 gap-3 relative z-10">
              {briefing.pillars.map((p) => {
                const cfg = STATUS_CONFIG[p.status];
                return (
                  <div
                    key={p.label}
                    className="rounded-t-3xl px-6 pt-5 pb-4 bg-white border-t border-x"
                    style={{ borderColor: cfg.border + "60" }}
                  >
                    <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">{p.label}</div>
                    <div className="text-lg font-bold mb-1" style={{ color: cfg.text }}>{p.status}</div>
                    <div className="text-xs text-[#5f6368]">{p.note}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail content */}
          <div className="px-8 py-6">
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Selected Briefing</div>
            <div className="font-mono text-sm font-semibold text-[#1f1f1f] mb-6">{briefing.displayDate}</div>

            <div className="grid grid-cols-5 gap-6">
              {/* ── Left: Full briefing text ────────────────────────────── */}
              <div className="col-span-3 space-y-6">
                {/* Daily Briefing copy */}
                <div className="bg-white rounded-3xl p-6 border border-[#e8eaed]">
                  <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-3">Daily Briefing</div>
                  <h2 className="text-[#1f1f1f] mb-2" style={{ fontSize: "1.6rem", lineHeight: "1.2", letterSpacing: "-0.02em" }}>
                    {briefing.headline}
                  </h2>
                  <p className="text-[#5f6368] leading-relaxed mb-5">{briefing.summary}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {briefing.pillars.map((p) => {
                      const cfg = STATUS_CONFIG[p.status];
                      return (
                        <div key={p.label} className="rounded-2xl p-3 border" style={{ backgroundColor: cfg.bg + "80", borderColor: cfg.border + "50" }}>
                          <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: cfg.text }}>
                            {p.label}
                          </div>
                          <div className="text-sm font-bold" style={{ color: cfg.text }}>{p.status}</div>
                          <div className="text-xs text-[#5f6368] mt-0.5">{p.note}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What Changed — Top Risks */}
                <div className="bg-white rounded-3xl p-6 border border-[#e8eaed]">
                  <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-4">What Changed</div>
                  <h3 className="text-[#1f1f1f] mb-1">Top Risks</h3>
                  <div className="mt-4 border border-[#e8eaed] rounded-2xl overflow-hidden">
                    <div className="flex items-start justify-between p-4 border-b border-[#f1f3f4]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase text-[#9aa0a6] font-semibold">
                            {briefing.topRisk.status === "WATCH" ? "안정성 이하 귀류" : "Critical Alert"}
                          </span>
                        </div>
                        <h4 className="text-[#1f1f1f] mb-1">{briefing.topRisk.title}</h4>
                      </div>
                      <StatusBadge status={briefing.topRisk.status} />
                    </div>
                    <div className="p-4 space-y-3">
                      <p className="text-sm text-[#5f6368] leading-relaxed">{briefing.topRisk.detail}</p>
                      <div className="bg-[#f8f9fa] rounded-2xl p-3">
                        <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Why This Matters</div>
                        <p className="text-sm text-[#1f1f1f] leading-relaxed">{briefing.topRisk.why}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next 24H — Watch Items */}
                <div className="bg-white rounded-3xl p-6 border border-[#e8eaed]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-0.5">Next 24H</div>
                      <h3 className="text-[#1f1f1f]">Today's Watch Items</h3>
                    </div>
                    <Eye className="w-4 h-4 text-[#9aa0a6]" />
                  </div>
                  <div className="space-y-3">
                    {briefing.watchItems.map((item) => (
                      <div key={item.priority} className="flex items-start gap-4 py-3 border-b border-[#f1f3f4] last:border-0">
                        <div className="w-7 h-7 bg-[#f1f3f4] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-[#5f6368]">{item.priority}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9aa0a6]">
                              {item.timing}
                            </span>
                          </div>
                          <p className="text-sm text-[#1f1f1f] leading-relaxed mb-2">{item.text}</p>
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
                              <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#f8f9fa] text-[#5f6368] rounded-full font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right: Confidence + Signals ─────────────────────────── */}
              <div className="col-span-2 space-y-4">
                {/* Freshness */}
                <div className="bg-[#f8f9fa] rounded-3xl p-5">
                  <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-3">Freshness</div>
                  <div className="font-mono text-sm font-bold text-[#1f1f1f] mb-1">{briefing.date}</div>
                  <div className="text-xs text-[#5f6368]">Base data: {briefing.posture}</div>
                  <div className="text-xs text-[#5f6368] mt-0.5">09:00 Asia/Seoul</div>
                </div>

                {/* Confidence */}
                <div className="bg-white rounded-3xl p-5 border border-[#e8eaed]">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-[#9aa0a6]" />
                    <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold">Confidence</div>
                  </div>
                  <div className="text-sm font-semibold text-[#1f1f1f] mb-3">판단 신뢰도</div>
                  <div className="space-y-3">
                    {briefing.confidence.map((c, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl p-3 border ${
                          c.level === "WARNING"
                            ? "bg-[#fef9e6] border-[#f5d98a]"
                            : "bg-[#f0f7ff] border-[#a8c4ff]"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${
                            c.level === "WARNING" ? "text-[#92610a]" : "text-[#1a4a8a]"
                          }`}>{c.level}</span>
                          <span className="text-[10px] text-[#9aa0a6] font-mono">{c.category}</span>
                        </div>
                        <p className="text-xs text-[#5f6368] leading-relaxed">{c.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signals */}
                <div className="bg-white rounded-3xl p-5 border border-[#e8eaed]">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-[#9aa0a6]" />
                    <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold">Signals</div>
                  </div>
                  <div className="text-sm font-semibold text-[#1f1f1f] mb-3">입력 신호</div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {briefing.signals.confirmed.map((s) => (
                      <div key={s} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f8f9fa] rounded-full">
                        <CheckCircle className="w-3 h-3 text-[#1a7a4a]" />
                        <span className="text-[10px] font-mono text-[#5f6368]">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-2">Missing Inputs</div>
                  <div className="flex flex-wrap gap-1.5">
                    {briefing.signals.missing.map((m) => (
                      <div key={m} className="px-2.5 py-1 bg-[#fef0f0] rounded-full">
                        <span className="text-[10px] font-mono text-[#c0392b]">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* First Action */}
                <div className="bg-[#5e8fff] rounded-3xl p-5 text-white">
                  <div className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-2">First Action</div>
                  <p className="text-sm leading-relaxed">
                    {briefing.watchItems[0]?.text}
                  </p>
                  <button className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition-colors">
                    View full action plan <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
