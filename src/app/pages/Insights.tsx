import { useState } from "react";
import { Sparkles, Send, ChevronRight, TrendingUp, BarChart2, Radar as RadarIcon } from "lucide-react";
import {
  BarChart, Bar, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ── Data ──────────────────────────────────────────────────────────────────────

const impactData = [
  { category: "Weekend Peak",   impact: 145.2, pct: 42 },
  { category: "Retention Gain", impact: 78.4,  pct: 23 },
  { category: "Regional Growth",impact: 112.6, pct: 35 },
];

const gameRadarData = [
  { subject: "Retention",  stellar: 90, ocean: 80, mystery: 85 },
  { subject: "Revenue",    stellar: 95, ocean: 85, mystery: 65 },
  { subject: "Engagement", stellar: 78, ocean: 82, mystery: 71 },
  { subject: "Stability",  stellar: 88, ocean: 76, mystery: 90 },
  { subject: "Growth",     stellar: 82, ocean: 74, mystery: 60 },
  { subject: "ARPDAU",     stellar: 92, ocean: 80, mystery: 68 },
];

const cohortTrendData = [
  { week: "W8",  stellar: 72, ocean: 64, mystery: 68 },
  { week: "W9",  stellar: 73, ocean: 65, mystery: 69 },
  { week: "W10", stellar: 74, ocean: 66, mystery: 70 },
  { week: "W11", stellar: 75, ocean: 67, mystery: 71 },
  { week: "W12", stellar: 76, ocean: 68, mystery: 72 },
];

const TOOLTIP_STYLE = {
  backgroundColor: "#ffffff",
  border: "1px solid #e8eaed",
  borderRadius: "16px",
  fontSize: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

const AXIS_PROPS = { stroke: "#9aa0a6", fontSize: 11, tickLine: false as const };

// ── Conversation ───────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  chartType?: "bar" | "radar" | "line";
  insights?: { title: string; detail: string; color: string }[];
  recommendations?: { title: string; priority: string; reason: string; action: string; color: string }[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "user",
    content: "What drove the revenue increase this week?",
    timestamp: "14:23",
  },
  {
    id: 2,
    role: "assistant",
    content: "The 12.4% revenue increase this week was driven by three main factors. Here's the breakdown by impact:",
    timestamp: "14:23",
    chartType: "bar",
    insights: [
      {
        title: "Weekend Performance Peak",
        detail: "Saturday and Sunday revenue reached $445.2k, marking an 18% increase vs forecast. Mobile conversion rates during peak hours (18:00–22:00) exceeded desktop by 24%.",
        color: "#ffb3d9",
      },
      {
        title: "Player Retention Improvement",
        detail: "D7 retention improved to 68% across flagship titles (+4pp WoW). Stellar Quest shows the strongest gain, averaging 32-minute sessions.",
        color: "#00f5a0",
      },
      {
        title: "European Market Growth",
        detail: "EU markets contributed 34% of weekly revenue with +15% WoW. Germany and UK accounted for 62% of European revenue — DACH is the emerging opportunity.",
        color: "#ff8c69",
      },
    ],
  },
  {
    id: 3,
    role: "user",
    content: "Compare the top 3 games on a health radar. Which should we prioritize?",
    timestamp: "14:25",
  },
  {
    id: 4,
    role: "assistant",
    content: "Here's a multi-dimensional health comparison of your top 3 titles. Stellar Quest leads on Revenue and ARPDAU, but Mystery Tower shows superior Stability — relevant if you're planning a content update.",
    timestamp: "14:25",
    chartType: "radar",
    recommendations: [
      {
        title: "Stellar Quest",
        priority: "High",
        reason: "Highest revenue generator (+32% WoW) with 76% D7 retention — 6-week high. Strong mobile conversion advantage.",
        action: "Increase promotional budget 25%. Prepare next content phase for early April to sustain momentum.",
        color: "#5e8fff",
      },
      {
        title: "Ocean Voyage",
        priority: "High",
        reason: "Second-highest revenue, stable 68% D7. Mobile conversion +28% vs desktop — lowest friction title.",
        action: "Optimize mobile onboarding. Test weekend-specific promotions to close the gap with Stellar Quest.",
        color: "#b8a3ff",
      },
      {
        title: "Mystery Tower",
        priority: "Watch",
        reason: "Best Stability score (90/100) — lowest variance game in portfolio. Strong EU presence (42% of revenue). D7 at 72%.",
        action: "Expand DACH market campaign. Stability gives you safe ground to test new features here first.",
        color: "#00f5a0",
      },
    ],
  },
  {
    id: 5,
    role: "user",
    content: "Show me D7 retention trends for the top 3 games over the last 5 weeks.",
    timestamp: "14:28",
  },
  {
    id: 6,
    role: "assistant",
    content: "All three titles show consistent improvement in D7 retention over the 5-week window. Stellar Quest improved the fastest (+4pp), while Mystery Tower shows the most stability — suggesting strong content quality despite lower absolute numbers.",
    timestamp: "14:28",
    chartType: "line",
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function UserMessage({ content, timestamp }: { content: string; timestamp: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[600px]">
        <div className="bg-[#1f1f1f] text-white rounded-[28px] px-5 py-3.5 mb-1">
          <p className="leading-relaxed text-sm">{content}</p>
        </div>
        <div className="text-xs font-mono text-[#9aa0a6] text-right px-2">{timestamp}</div>
      </div>
    </div>
  );
}

function AssistantMessage({ message }: { message: Message }) {
  const { content, timestamp, chartType, insights, recommendations } = message;

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-[#f8f9fa] border border-[#e8eaed] rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-[#1f1f1f]" />
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-[#1f1f1f] leading-relaxed text-sm font-medium">{content}</p>
          </div>

          {/* Bar chart */}
          {chartType === "bar" && (
            <div className="bg-[#f8f9fa] rounded-3xl p-5 mb-4 border border-[#e8eaed]">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="w-4 h-4 text-[#9aa0a6]" />
                <h4 className="text-[#1f1f1f]">Revenue Impact by Driver</h4>
                <span className="ml-auto text-xs text-[#9aa0a6] font-mono">($k contribution)</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" vertical={false} />
                    <XAxis dataKey="category" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
                    <YAxis {...AXIS_PROPS} axisLine={false} tickFormatter={(v) => `$${v}k`} />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v: number, _, props) => [`$${v.toFixed(1)}k (${props.payload.pct}%)`, "Impact"]}
                    />
                    <Bar dataKey="impact" radius={[8, 8, 0, 0]} barSize={40}>
                      {impactData.map((_, i) => (
                        <Cell key={i} fill={["#ffb3d9", "#00f5a0", "#ff8c69"][i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Insights */}
          {insights && (
            <div className="space-y-2 mb-4">
              {insights.map((ins, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-4 border"
                  style={{ backgroundColor: ins.color + "25", borderColor: ins.color + "60" }}
                >
                  <h4 className="text-sm font-semibold text-[#1f1f1f] mb-1">{ins.title}</h4>
                  <p className="text-xs text-[#5f6368] leading-relaxed">{ins.detail}</p>
                </div>
              ))}
            </div>
          )}

          {/* Radar chart */}
          {chartType === "radar" && (
            <div className="bg-[#f8f9fa] rounded-3xl p-5 mb-4 border border-[#e8eaed]">
              <div className="flex items-center gap-2 mb-3">
                <RadarIcon className="w-4 h-4 text-[#9aa0a6]" />
                <h4 className="text-[#1f1f1f]">Game Health Radar — Top 3 Titles</h4>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={gameRadarData} cx="50%" cy="50%" outerRadius={80}>
                    <PolarGrid stroke="#e8eaed" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#9aa0a6" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Stellar Quest" dataKey="stellar" stroke="#5e8fff" fill="#5e8fff" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="Ocean Voyage"  dataKey="ocean"   stroke="#b8a3ff" fill="#b8a3ff" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="Mystery Tower" dataKey="mystery" stroke="#00f5a0" fill="#00f5a0" fillOpacity={0.2} strokeWidth={2} />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations && (
            <div className="space-y-3 mb-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-[#e8eaed]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-[#1f1f1f]">{rec.title}</h4>
                    <div
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                      style={{ backgroundColor: rec.color + "30", color: rec.color === "#00f5a0" ? "#1a7a4a" : rec.color }}
                    >
                      {rec.priority}
                    </div>
                  </div>
                  <p className="text-xs text-[#5f6368] leading-relaxed mb-3">{rec.reason}</p>
                  <div
                    className="rounded-xl p-3"
                    style={{ backgroundColor: rec.color + "15" }}
                  >
                    <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Recommended Action</div>
                    <p className="text-xs text-[#1f1f1f] leading-relaxed font-medium">{rec.action}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Line chart */}
          {chartType === "line" && (
            <div className="bg-[#f8f9fa] rounded-3xl p-5 mb-4 border border-[#e8eaed]">
              <h4 className="text-[#1f1f1f] mb-1">D7 Retention Trend — 5-Week View</h4>
              <p className="text-xs text-[#9aa0a6] mb-4">W8 – W12 · All games improving</p>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cohortTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" vertical={false} />
                    <XAxis dataKey="week" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />
                    <YAxis {...AXIS_PROPS} axisLine={false} unit="%" domain={[58, 80]} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, ""]} />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, color: "#5f6368" }} />
                    <Line type="monotone" dataKey="stellar" name="Stellar Quest" stroke="#5e8fff" strokeWidth={2.5} dot={{ r: 4, fill: "#5e8fff" }} />
                    <Line type="monotone" dataKey="ocean"   name="Ocean Voyage"  stroke="#b8a3ff" strokeWidth={2.5} dot={{ r: 4, fill: "#b8a3ff" }} />
                    <Line type="monotone" dataKey="mystery" name="Mystery Tower" stroke="#00f5a0" strokeWidth={2.5} dot={{ r: 4, fill: "#00f5a0" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-[#9aa0a6]">{timestamp}</div>
            <button className="text-xs text-[#9aa0a6] hover:text-[#5e8fff] flex items-center gap-1 transition-colors">
              <TrendingUp className="w-3 h-3" />
              View source data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuggestedQuestion({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-2 bg-white border border-[#e8eaed] rounded-full text-xs text-[#5f6368] hover:text-[#1f1f1f] hover:border-[#5e8fff] hover:shadow-sm transition-all duration-150 flex items-center gap-1.5 font-medium"
    >
      {text}
      <ChevronRight className="w-3 h-3" />
    </button>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "Show D7 retention vs ARPDAU correlation",
  "Analyze EU market opportunity",
  "Predict next week's revenue",
  "Which cohort has the best LTV?",
  "Compare weekend vs weekday engagement",
];

export function Insights() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    };
    const aiMsg: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: "I'm analyzing your question based on current game performance data. This is a simulated response — connect your live data pipeline for real-time AI analysis.",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-[#e8eaed] px-8 py-5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Intelligence</div>
            <h1 className="text-[#1f1f1f]">AI Insights</h1>
            <p className="text-sm text-[#5f6368] mt-0.5">Ask questions, explore patterns, and get recommendations from your data</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-[#f8f9fa] border border-[#e8eaed] rounded-full text-xs text-[#5f6368] font-mono">
              Gemini 1.5 Flash
            </div>
            <button
              onClick={() => setMessages([])}
              className="px-4 py-2 text-sm text-[#5f6368] hover:text-[#1f1f1f] hover:bg-[#f8f9fa] rounded-full transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-[860px] mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-[#f8f9fa] border border-[#e8eaed] rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-[#5e8fff]" />
              </div>
              <h2 className="text-[#1f1f1f] mb-2">Ask anything about your games</h2>
              <p className="text-sm text-[#9aa0a6] max-w-md mx-auto leading-relaxed">
                I can analyze revenue trends, compare games, spot anomalies, and recommend actions — all from your analytics data.
              </p>
            </div>
          )}
          {messages.map((msg) =>
            msg.role === "user" ? (
              <UserMessage key={msg.id} content={msg.content} timestamp={msg.timestamp} />
            ) : (
              <AssistantMessage key={msg.id} message={msg} />
            )
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#e8eaed] bg-white flex-shrink-0">
        <div className="px-8 py-5 max-w-[860px] mx-auto">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask about revenue, retention, cohorts, or any game metric..."
              className="flex-1 px-5 py-3 bg-[#f8f9fa] border border-[#e8eaed] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#5e8fff] focus:border-transparent focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSend(input)}
              className="px-6 py-3 bg-[#1f1f1f] text-white rounded-full hover:bg-[#3c4043] transition-colors flex items-center gap-2 font-medium text-sm"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {SUGGESTIONS.map((s) => (
              <SuggestedQuestion key={s} text={s} onClick={() => handleSend(s)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}