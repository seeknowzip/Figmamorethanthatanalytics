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
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#e8eaed]">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">Reports</h1>
              <p className="text-[#5f6368] text-sm">Executive summaries and analytical briefings</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 text-[#5f6368] hover:text-[#1f1f1f] hover:bg-[#f8f9fa] rounded-full transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-[#5f6368] hover:text-[#1f1f1f] hover:bg-[#f8f9fa] rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-[1400px] mx-auto">
        {/* Current Report */}
        <article className="mb-8">
          <div className="bg-[#5e8fff] rounded-[40px] overflow-hidden">
            {/* Report Header */}
            <div className="px-10 pt-10 pb-8 text-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1.5 bg-[#00f5a0] text-[#1f1f1f] text-xs font-bold rounded-full">
                      LIVE
                    </div>
                    <div className="text-xs uppercase tracking-wider font-medium opacity-90">
                      Current Period
                    </div>
                  </div>
                  <h2 className="mb-3 text-white" style={{ fontSize: '1.75rem' }}>
                    {currentReport.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm opacity-90">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {currentReport.date}
                    </div>
                    <div className="font-mono text-xs bg-white/20 px-2.5 py-1 rounded-full">
                      {currentReport.id}
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1f1f1f] text-white rounded-full text-sm hover:bg-[#3c4043] transition-colors">
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
                />
                <MetricDisplay
                  label="Active Players"
                  value={currentReport.metrics.players.toLocaleString()}
                  change={`+${currentReport.metrics.engagement}%`}
                />
                <MetricDisplay
                  label="Week-over-Week"
                  value={`+${currentReport.metrics.growth}%`}
                  change="vs W10"
                />
                <MetricDisplay
                  label="Status"
                  value="On Target"
                  change="+18% vs forecast"
                />
              </div>
            </div>

            {/* Report Body */}
            <div className="bg-white px-10 py-8 rounded-t-[40px]">
              <div className="mb-8">
                <h3 className="mb-4">Executive Summary</h3>
                <p className="text-[#1f1f1f] leading-relaxed text-base mb-4">
                  {currentReport.summary}
                </p>
                <p className="text-[#1f1f1f] leading-relaxed text-base">
                  Key drivers include sustained player engagement in flagship titles and successful 
                  weekend promotional campaigns. Platform-wide session duration increased to an average 
                  of <span className="font-mono font-semibold text-[#5e8fff]">24m 32s</span>, with 
                  conversion metrics ahead of quarterly targets.
                </p>
              </div>

              {/* Inline Chart */}
              <div className="mb-8 bg-[#f8f9fa] rounded-3xl p-6 border border-[#e8eaed]">
                <div className="mb-4">
                  <h4 className="mb-1">Revenue Trajectory</h4>
                  <p className="text-sm text-[#5f6368]">Three-week comparison</p>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueComparison}>
                      <defs>
                        <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#5e8fff" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#5e8fff" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" vertical={false} />
                      <XAxis
                        dataKey="week"
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
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
                      <Area
                        type="monotone"
                        dataKey="current"
                        stroke="#5e8fff"
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
                    bgColor="#ffb3d9"
                  />
                  <Finding
                    title="Retention Improvement"
                    content="Day-7 retention across flagship titles improved to 68%, up from 64% the previous week. Player cohorts from the recent content update show particularly strong engagement patterns."
                    bgColor="#00f5a0"
                  />
                  <Finding
                    title="Regional Growth"
                    content="European markets contributed 34% of total revenue this week, showing 15% growth versus the prior period. APAC regions maintained steady performance with stable conversion metrics."
                    bgColor="#ff8c69"
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-[#f8f9fa] rounded-3xl p-6 border border-[#e8eaed]">
                <h4 className="mb-4">Recommended Actions</h4>
                <ul className="space-y-3 text-[#1f1f1f]">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#5e8fff] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span>Continue weekend promotional strategy with increased allocation for peak traffic hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00f5a0] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-[#1f1f1f]" />
                    </div>
                    <span>Expand mobile optimization efforts to capitalize on growing conversion advantage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#ff8c69] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-[#1f1f1f]" />
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
            <p className="text-sm text-[#5f6368]">Historical briefings and analysis</p>
          </div>

          <div className="space-y-4">
            {reports.slice(1).map((report) => (
              <button
                key={report.id}
                className="w-full bg-white rounded-3xl p-6 border border-[#e8eaed] hover:border-[#5e8fff] hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#5f6368] mb-2 font-medium">
                      {report.date}
                    </div>
                    <h4 className="mb-2 group-hover:text-[#5e8fff] transition-colors">
                      {report.title}
                    </h4>
                  </div>
                  <div className="font-mono text-xs text-[#5f6368] bg-[#f8f9fa] px-2.5 py-1 rounded-full">
                    {report.id}
                  </div>
                </div>
                <p className="text-sm text-[#5f6368] mb-4 line-clamp-2">
                  {report.summary}
                </p>
                <div className="flex items-center gap-6 text-xs font-mono">
                  <div className="text-[#5f6368]">
                    Revenue: <span className="text-[#1f1f1f] font-semibold">${report.metrics.revenue.toLocaleString()}</span>
                  </div>
                  <div className="text-[#5f6368]">
                    Growth: <span className="text-[#00f5a0] font-semibold">+{report.metrics.growth}%</span>
                  </div>
                  <div className="text-[#5f6368]">
                    Players: <span className="text-[#1f1f1f] font-semibold">{report.metrics.players.toLocaleString()}</span>
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
}

function MetricDisplay({ label, value, change }: MetricDisplayProps) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider mb-2 font-medium opacity-90">
        {label}
      </div>
      <div className="font-mono text-xl font-bold mb-1">
        {value}
      </div>
      <div className="text-xs opacity-80">
        {change}
      </div>
    </div>
  );
}

interface FindingProps {
  title: string;
  content: string;
  bgColor: string;
}

function Finding({ title, content, bgColor }: FindingProps) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-[#e8eaed] hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="w-1.5 h-16 rounded-full flex-shrink-0" style={{ backgroundColor: bgColor }}></div>
        <div className="flex-1">
          <h4 className="mb-2">{title}</h4>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
