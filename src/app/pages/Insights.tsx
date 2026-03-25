import { Sparkles, Send, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const conversationHistory = [
  {
    role: "user",
    content: "What drove the revenue increase this week?",
    timestamp: "14:23"
  },
  {
    role: "assistant",
    content: "The 12.4% revenue increase this week was primarily driven by three factors:",
    timestamp: "14:23",
    insights: [
      {
        title: "Weekend Performance",
        detail: "Saturday and Sunday revenue reached $445.2k, marking an 18% increase versus forecast. Mobile conversion rates during weekend peak hours (18:00-22:00) exceeded desktop by 24%.",
      },
      {
        title: "Player Retention Improvement",
        detail: "Day-7 retention improved to 68% across flagship titles, up from 64% last week. The recent content update in Stellar Quest shows particularly strong engagement, with session duration averaging 32 minutes.",
      },
      {
        title: "Regional Growth",
        detail: "European markets contributed 34% of weekly revenue with 15% growth. Germany and UK markets showed strongest performance, accounting for 62% of European revenue.",
      }
    ],
    data: [
      { category: "Weekend Peak", impact: 145.2, percentage: 42 },
      { category: "Retention Gains", impact: 78.4, percentage: 23 },
      { category: "Regional Growth", impact: 112.6, percentage: 35 },
    ]
  },
  {
    role: "user",
    content: "Which game titles should we focus on for next week?",
    timestamp: "14:25"
  },
  {
    role: "assistant",
    content: "Based on current performance metrics and growth trends, I recommend focusing on these titles:",
    timestamp: "14:25",
    recommendations: [
      {
        title: "Stellar Quest",
        priority: "High",
        reason: "Leading revenue generator with 32% week-over-week growth. Recent content update driving strong retention (76%) and highest ARPDAU at $4.23.",
        action: "Increase promotional budget by 25% and prepare next content phase for early April."
      },
      {
        title: "Ocean Voyage",
        priority: "High",
        reason: "Second-highest revenue with stable 68% retention. Mobile platform showing 28% conversion advantage over desktop.",
        action: "Optimize mobile experience and test weekend-specific promotional campaigns."
      },
      {
        title: "Mystery Tower",
        priority: "Medium",
        reason: "Solid fundamentals with 72% retention but moderate revenue growth. Strong European market presence (45% of title revenue).",
        action: "Explore regional expansion strategies, particularly in DACH markets."
      }
    ]
  }
];

export function Insights() {
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafbfc' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">AI Insights</h1>
              <p className="text-[#6b7280] text-sm">Ask questions and explore your data with AI assistance</p>
            </div>
            <button className="px-4 py-2 text-sm text-[#6b7280] hover:text-[#4285f4] hover:bg-[#f3f4f6] rounded-lg transition-colors">
              Clear Conversation
            </button>
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-[900px] mx-auto space-y-6">
          {conversationHistory.map((message, index) => (
            <div key={index}>
              {message.role === "user" ? (
                <UserMessage content={message.content} timestamp={message.timestamp} />
              ) : (
                <AssistantMessage
                  content={message.content}
                  timestamp={message.timestamp}
                  insights={message.insights}
                  recommendations={message.recommendations}
                  data={message.data}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[#e5e7eb] bg-white shadow-lg">
        <div className="px-8 py-6 max-w-[900px] mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your analytics data..."
              className="flex-1 px-4 py-3 bg-[#f3f4f6] border border-[#e5e7eb] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#4285f4] to-[#9334e9] text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <SuggestedQuestion text="Show top performing games" />
            <SuggestedQuestion text="Analyze player churn trends" />
            <SuggestedQuestion text="Compare regional performance" />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserMessage({ content, timestamp }: { content: string; timestamp: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[600px]">
        <div className="bg-gradient-to-r from-[#4285f4] to-[#9334e9] text-white rounded-2xl px-5 py-3.5 mb-1 shadow-sm">
          <p className="leading-relaxed">{content}</p>
        </div>
        <div className="text-xs font-mono text-[#6b7280] text-right px-2">
          {timestamp}
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ 
  content, 
  timestamp, 
  insights, 
  recommendations,
  data 
}: { 
  content: string; 
  timestamp: string;
  insights?: Array<{ title: string; detail: string }>;
  recommendations?: Array<{ title: string; priority: string; reason: string; action: string }>;
  data?: Array<{ category: string; impact: number; percentage: number }>;
}) {
  return (
    <div>
      <div className="flex items-start gap-3 mb-1">
        <div className="w-10 h-10 bg-gradient-to-br from-[#4285f4] to-[#9334e9] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-[#111827] leading-relaxed font-medium">{content}</p>
          </div>

          {/* Insights */}
          {insights && (
            <div className="space-y-3 mb-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-1.5 h-16 rounded-full flex-shrink-0 ${
                      idx === 0 ? 'bg-gradient-to-b from-[#4285f4] to-[#9334e9]' :
                      idx === 1 ? 'bg-gradient-to-b from-[#10b981] to-[#059669]' :
                      'bg-gradient-to-b from-[#ec4899] to-[#f97316]'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="mb-2">{insight.title}</h4>
                      <p className="text-sm text-[#6b7280] leading-relaxed">
                        {insight.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Data Visualization */}
          {data && (
            <div className="bg-gradient-to-br from-[#4285f4]/5 via-[#9334e9]/5 to-[#ec4899]/5 rounded-2xl p-6 mb-4 border border-[#e5e7eb]">
              <div className="mb-4">
                <h4 className="mb-1">Revenue Impact Breakdown</h4>
                <p className="text-sm text-[#6b7280]">Contribution by factor ($k)</p>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4285f4" />
                        <stop offset="50%" stopColor="#9334e9" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="category"
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
                      tickFormatter={(value) => `$${value}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '11px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      formatter={(value: number, name, props) => [
                        `$${value.toFixed(1)}k (${props.payload.percentage}%)`,
                        'Impact'
                      ]}
                    />
                    <Bar dataKey="impact" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations && (
            <div className="space-y-3 mb-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <h4>{rec.title}</h4>
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      rec.priority === "High" 
                        ? "bg-gradient-to-r from-[#ec4899] to-[#f97316] text-white shadow-sm" 
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}>
                      {rec.priority}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#6b7280] mb-1.5 font-medium">
                        Analysis
                      </div>
                      <p className="text-sm text-[#6b7280] leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#4285f4]/5 to-[#9334e9]/5 rounded-xl p-4 border border-[#e5e7eb]">
                      <div className="text-xs uppercase tracking-wider text-[#6b7280] mb-1.5 font-medium">
                        Recommended Action
                      </div>
                      <p className="text-sm text-[#111827] leading-relaxed font-medium">
                        {rec.action}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-[#6b7280]">
              {timestamp}
            </div>
            <button className="text-xs text-[#6b7280] hover:text-[#4285f4] flex items-center gap-1 transition-colors">
              <TrendingUp className="w-3 h-3" />
              View Source Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuggestedQuestion({ text }: { text: string }) {
  return (
    <button className="px-3 py-2 bg-white border border-[#e5e7eb] rounded-xl text-xs text-[#6b7280] hover:text-[#4285f4] hover:border-[#4285f4] hover:shadow-sm transition-all duration-200 flex items-center gap-1.5">
      {text}
      <ChevronRight className="w-3 h-3" />
    </button>
  );
}