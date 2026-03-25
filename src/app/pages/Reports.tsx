import { Calendar, Download, Filter, Search, ChevronRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const reports = [
  {
    id: "RPT-2026-0325-001",
    title: "Weekly Performance Briefing",
    date: "March 25, 2026",
    timestamp: "09:24",
    status: "current",
    summary: "Strong revenue momentum continues with weekend performance exceeding forecasts by 18%. Player retention across core titles shows consistent improvement.",
    metrics: {
      revenue: 445200,
      growth: 12.4,
      players: 21542,
      engagement: 8.2
    }
  },
  {
    id: "RPT-2026-0318-001",
    title: "Weekly Performance Briefing",
    date: "March 18, 2026",
    timestamp: "09:15",
    status: "archived",
    summary: "Steady growth in core metrics with notable improvement in conversion rates. Mobile platform showing strongest gains week-over-week.",
    metrics: {
      revenue: 396800,
      growth: 8.7,
      players: 19920,
      engagement: 6.4
    }
  },
  {
    id: "RPT-2026-0311-001",
    title: "Weekly Performance Briefing",
    date: "March 11, 2026",
    timestamp: "09:20",
    status: "archived",
    summary: "Platform stability improvements reflect in session duration metrics. New content launch in Stellar Quest drove engagement increase.",
    metrics: {
      revenue: 365200,
      growth: 5.2,
      players: 18710,
      engagement: 4.8
    }
  },
];

const revenueComparison = [
  { week: "W9", current: 365200, previous: 347100 },
  { week: "W10", current: 396800, previous: 365200 },
  { week: "W11", current: 445200, previous: 396800 },
];

export function Reports() {
  const currentReport = reports[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafbfc' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">Reports</h1>
              <p className="text-[#6b7280] text-sm">Executive summaries and analytical briefings</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 text-[#6b7280] hover:text-[#4285f4] hover:bg-[#f3f4f6] rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-[#6b7280] hover:text-[#4285f4] hover:bg-[#f3f4f6] rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-[1400px] mx-auto">
        {/* Current Report - Editorial Focus */}
        <article className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Report Header */}
            <div className="px-8 pt-8 pb-6 border-b border-[#e5e7eb] bg-gradient-to-br from-[#4285f4]/5 via-white to-[#9334e9]/5">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1 bg-gradient-to-r from-[#10b981] to-[#059669] text-white text-xs font-bold rounded-lg shadow-sm">
                      LIVE
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[#6b7280] font-medium">
                      Current Period
                    </div>
                  </div>
                  <h2 className="mb-3" style={{ fontSize: '1.75rem' }}>
                    {currentReport.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {currentReport.date}
                    </div>
                    <div className="font-mono text-xs bg-[#f3f4f6] px-2 py-1 rounded">
                      {currentReport.id}
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4285f4] to-[#9334e9] text-white rounded-xl text-sm hover:shadow-lg transition-all duration-200">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
              </div>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-4 gap-6 pt-6">
                <MetricDisplay
                  label="Revenue"
                  value={`$${currentReport.metrics.revenue.toLocaleString()}`}
                  change={`+${currentReport.metrics.growth}%`}
                  gradient="from-[#4285f4] to-[#1e40af]"
                />
                <MetricDisplay
                  label="Active Players"
                  value={currentReport.metrics.players.toLocaleString()}
                  change={`+${currentReport.metrics.engagement}%`}
                  gradient="from-[#9334e9] to-[#ec4899]"
                />
                <MetricDisplay
                  label="Week-over-Week"
                  value={`+${currentReport.metrics.growth}%`}
                  change="vs W10"
                  gradient="from-[#10b981] to-[#059669]"
                />
                <MetricDisplay
                  label="Status"
                  value="On Target"
                  change="+18% vs forecast"
                  gradient="from-[#f97316] to-[#ea580c]"
                />
              </div>
            </div>

            {/* Report Body - Editorial Reading Flow */}
            <div className="px-8 py-8">
              <div className="mb-8">
                <h3 className="mb-4">Executive Summary</h3>
                <p className="text-[#111827] leading-relaxed text-base mb-4">
                  {currentReport.summary}
                </p>
                <p className="text-[#111827] leading-relaxed text-base">
                  Key drivers include sustained player engagement in flagship titles and successful 
                  weekend promotional campaigns. Platform-wide session duration increased to an average 
                  of <span className="font-mono font-semibold text-[#4285f4]">24m 32s</span>, with 
                  conversion metrics ahead of quarterly targets.
                </p>
              </div>

              {/* Inline Chart */}
              <div className="mb-8 bg-gradient-to-br from-[#4285f4]/5 via-[#9334e9]/5 to-[#ec4899]/5 rounded-2xl p-6 border border-[#e5e7eb]">
                <div className="mb-4">
                  <h4 className="mb-1">Revenue Trajectory</h4>
                  <p className="text-sm text-[#6b7280]">Three-week comparison</p>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueComparison}>
                      <defs>
                        <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4285f4" stopOpacity={0.3} />
                          <stop offset="50%" stopColor="#9334e9" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis
                        dataKey="week"
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
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
                      <Area
                        type="monotone"
                        dataKey="current"
                        stroke="#4285f4"
                        strokeWidth={3}
                        fill="url(#currentGradient)"
                        name="Current Week"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Findings */}
              <div className="mb-8">
                <h3 className="mb-4">Key Findings</h3>
                <div className="space-y-4">
                  <Finding
                    title="Weekend Performance Peak"
                    content="Saturday and Sunday combined accounted for 42% of weekly revenue, marking the highest weekend concentration this quarter. Mobile conversion rates during peak hours exceeded desktop for the first time."
                    gradient="from-[#4285f4] to-[#9334e9]"
                  />
                  <Finding
                    title="Retention Improvement"
                    content="Day-7 retention across flagship titles improved to 68%, up from 64% the previous week. Player cohorts from the recent content update show particularly strong engagement patterns."
                    gradient="from-[#10b981] to-[#059669]"
                  />
                  <Finding
                    title="Regional Growth"
                    content="European markets contributed 34% of total revenue this week, showing 15% growth versus the prior period. APAC regions maintained steady performance with stable conversion metrics."
                    gradient="from-[#ec4899] to-[#f97316]"
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-[#4285f4]/10 via-[#9334e9]/5 to-[#ec4899]/10 rounded-2xl p-6 border border-[#e5e7eb]">
                <h4 className="mb-4">Recommended Actions</h4>
                <ul className="space-y-3 text-[#111827]">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#4285f4] to-[#9334e9] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span>Continue weekend promotional strategy with increased allocation for peak traffic hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span>Expand mobile optimization efforts to capitalize on growing conversion advantage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#ec4899] to-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span>Monitor European market trends closely for potential scaling opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* Report Archive */}
        <div>
          <div className="mb-6">
            <h3>Previous Reports</h3>
            <p className="text-sm text-[#6b7280]">Historical briefings and analysis</p>
          </div>

          <div className="space-y-4">
            {reports.slice(1).map((report) => (
              <button
                key={report.id}
                className="w-full bg-white rounded-2xl p-6 border border-[#e5e7eb] hover:border-[#4285f4] hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#6b7280] mb-2 font-medium">
                      {report.date}
                    </div>
                    <h4 className="mb-2 group-hover:text-[#4285f4] transition-colors">
                      {report.title}
                    </h4>
                  </div>
                  <div className="font-mono text-xs text-[#6b7280] bg-[#f3f4f6] px-2 py-1 rounded">
                    {report.id}
                  </div>
                </div>
                <p className="text-sm text-[#6b7280] mb-4 line-clamp-2">
                  {report.summary}
                </p>
                <div className="flex items-center gap-6 text-xs font-mono">
                  <div className="text-[#6b7280]">
                    Revenue: <span className="text-[#111827] font-semibold">${report.metrics.revenue.toLocaleString()}</span>
                  </div>
                  <div className="text-[#6b7280]">
                    Growth: <span className="text-[#10b981] font-semibold">+{report.metrics.growth}%</span>
                  </div>
                  <div className="text-[#6b7280]">
                    Players: <span className="text-[#111827] font-semibold">{report.metrics.players.toLocaleString()}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricDisplayProps {
  label: string;
  value: string;
  change: string;
  gradient: string;
}

function MetricDisplay({ label, value, change, gradient }: MetricDisplayProps) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-[#6b7280] mb-2 font-medium">
        {label}
      </div>
      <div className={`font-mono text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
        {value}
      </div>
      <div className="text-xs text-[#6b7280]">
        {change}
      </div>
    </div>
  );
}

interface FindingProps {
  title: string;
  content: string;
  gradient: string;
}

function Finding({ title, content, gradient }: FindingProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e5e7eb] hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className={`w-1 h-16 bg-gradient-to-b ${gradient} rounded-full flex-shrink-0`}></div>
        <div className="flex-1">
          <h4 className="mb-2">{title}</h4>
          <p className="text-sm text-[#6b7280] leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}