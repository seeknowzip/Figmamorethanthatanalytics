import { useState } from "react";
import { RefreshCw, Key, Link2, Unlink, Calendar, Clock, Mail, Bell, Shield, Database } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type SettingsTab = "workspace" | "notifications" | "security" | "data";

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionCard({
  color,
  eyebrow,
  title,
  children,
  action,
}: {
  color: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[40px] overflow-hidden border border-[#e8eaed]">
      <div className="px-8 py-6 flex items-center justify-between" style={{ backgroundColor: color }}>
        <div>
          <div className="text-[10px] uppercase tracking-widest font-semibold mb-1 text-[#5f6368]">{eyebrow}</div>
          <h2 className="text-[#1f1f1f]">{title}</h2>
        </div>
        {action}
      </div>
      <div className="bg-white px-8 py-7 rounded-t-[40px]">
        {children}
      </div>
    </div>
  );
}

function FieldRow({ label, children, helper }: { label: string; children: React.ReactNode; helper?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-[#1f1f1f]">{label}</label>
      {children}
      {helper && <p className="text-xs text-[#9aa0a6]">{helper}</p>}
    </div>
  );
}

function TextInput({ value, readOnly, placeholder }: { value?: string; readOnly?: boolean; placeholder?: string }) {
  return (
    <input
      type="text"
      defaultValue={value}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 border border-[#e8eaed] rounded-2xl text-sm transition-all ${
        readOnly
          ? "bg-[#f8f9fa] text-[#5f6368] cursor-default"
          : "bg-white focus:outline-none focus:ring-2 focus:ring-[#5e8fff] focus:border-transparent"
      }`}
    />
  );
}

function StatusRow({ label, value, status }: { label: string; value: string; status: "connected" | "missing" | "pending" }) {
  const cfg = {
    connected: { dot: "#1a7a4a", text: "text-[#1a7a4a]", label: "Connected" },
    missing:   { dot: "#9aa0a6", text: "text-[#9aa0a6]", label: "Not set" },
    pending:   { dot: "#92610a", text: "text-[#92610a]", label: "Pending" },
  }[status];
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#f1f3f4] last:border-0">
      <span className="text-sm text-[#5f6368]">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-[#1f1f1f]">{value}</span>
        <div className={`flex items-center gap-1.5 text-xs font-medium ${cfg.text}`}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
          {cfg.label}
        </div>
      </div>
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-[#5e8fff]" : "bg-[#dadce0]"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ── Tab Content Views ──────────────────────────────────────────────────────────

function WorkspaceTab() {
  const [model, setModel] = useState("gemini-1.5-flash");
  const [slackEnabled, setSlackEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Workspace Defaults */}
      <SectionCard color="#ffb3d9" eyebrow="Workspace Defaults" title="기본 설정">
        <div className="grid grid-cols-2 gap-8">
          {/* AI Column */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold">AI</div>
              <button className="px-3 py-1.5 border border-[#e8eaed] text-xs text-[#5f6368] rounded-full hover:bg-[#f8f9fa] transition-colors">
                API key 미설정
              </button>
            </div>
            <FieldRow label="Gemini 모델">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#e8eaed] rounded-2xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5e8fff]"
              >
                <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash</option>
              </select>
              <p className="text-xs text-[#9aa0a6] mt-1">저장된 키 —</p>
            </FieldRow>
            <FieldRow label="새 API KEY">
              <TextInput placeholder="AIza... 항목에 키 입력" />
            </FieldRow>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 border border-[#e8eaed] text-sm text-[#5f6368] rounded-2xl hover:bg-[#f8f9fa] transition-colors font-medium">
                API key 저장
              </button>
              <button className="flex-1 px-4 py-2.5 border border-[#e8eaed] text-sm text-[#5f6368] rounded-2xl hover:bg-[#f8f9fa] transition-colors font-medium">
                key 해제
              </button>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 border border-[#e8eaed] text-sm text-[#5f6368] rounded-2xl hover:bg-[#f8f9fa] transition-colors font-medium">
                목록 정신
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#5e8fff] text-white text-sm rounded-2xl hover:bg-[#4a7aee] transition-colors font-medium">
                모델 적용
              </button>
            </div>
          </div>

          {/* Data Source Column */}
          <div className="space-y-5 pl-8 border-l border-[#f1f3f4]">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold">Data Source</div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8eaed] text-xs text-[#5f6368] rounded-full hover:bg-[#f8f9fa] transition-colors">
                <Unlink className="w-3 h-3" />
                미연결
              </button>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1f1f1f] mb-1">Taxonomy 소스</div>
              <div className="text-xs text-[#9aa0a6] space-y-0.5">
                <div>Sheet —</div>
                <div>최근 동기화 —</div>
                <div>Events 0 / Properties 0</div>
              </div>
            </div>
            <FieldRow label="Google Sheet URL 또는 ID">
              <TextInput placeholder="https://docs.google.com/spreadsheets/d/... 또는 SHEET_ID" />
            </FieldRow>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 border border-[#e8eaed] text-sm text-[#5f6368] rounded-2xl hover:bg-[#f8f9fa] transition-colors font-medium">
                소스 저장
              </button>
              <button className="flex-1 px-4 py-2.5 border border-[#e8eaed] text-sm text-[#5f6368] rounded-2xl hover:bg-[#f8f9fa] transition-colors font-medium">
                동기화
              </button>
            </div>
            <button className="w-full px-4 py-2.5 border border-dashed border-[#c5cad0] text-sm text-[#5f6368] rounded-2xl hover:bg-[#f8f9fa] transition-colors font-medium">
              CSV 업로드
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Slack Delivery */}
      <SectionCard
        color="#00f5a0"
        eyebrow="Delivery"
        title="Slack 전달"
        action={
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${slackEnabled ? "bg-[#1f1f1f] text-white" : "bg-white/60 text-[#5f6368]"}`}>
            {slackEnabled ? "활성" : "미설정"}
          </div>
        }
      >
        <div className="flex items-center gap-3 mb-6">
          <Toggle enabled={slackEnabled} onChange={setSlackEnabled} />
          <span className="text-sm text-[#5f6368]">이 게임의 Slack 전달 사용</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <FieldRow label="Slack 대상 이름">
              <TextInput placeholder="#rectangles-daily" />
            </FieldRow>
            <FieldRow label="채널 / 접두어">
              <TextInput placeholder="@hare" />
            </FieldRow>
          </div>
          <div className="space-y-4">
            <FieldRow label="Slack Webhook" helper="webhook 없음">
              <TextInput placeholder="https://hooks.slack.com/services/..." />
            </FieldRow>
            <FieldRow label="표시 이름">
              <TextInput value="Rectangles Ops" />
            </FieldRow>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-[#f1f3f4] grid grid-cols-3 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">소스 상태</div>
            <div className="text-sm font-semibold text-[#1f1f1f]">미설정</div>
            <div className="text-xs text-[#9aa0a6]">저장된 전달 설정이 없습니다.</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">큐 상태</div>
            <div className="text-sm font-semibold text-[#1f1f1f]">미설정</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">마지막 전달</div>
            <div className="text-sm font-semibold text-[#1f1f1f]">—</div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function NotificationsTab() {
  const [weeklyBrief, setWeeklyBrief] = useState(true);
  const [dailySummary, setDailySummary] = useState(true);
  const [monthlyReport, setMonthlyReport] = useState(false);
  const [anomalyAlert, setAnomalyAlert] = useState(true);

  const schedules = [
    { title: "Weekly Performance Briefing", schedule: "Every Monday at 09:00 KST", recipients: 3, enabled: weeklyBrief, onToggle: setWeeklyBrief },
    { title: "Daily Metrics Summary",       schedule: "Every day at 08:00 KST",     recipients: 5, enabled: dailySummary, onToggle: setDailySummary },
    { title: "Monthly Executive Report",    schedule: "First Monday of month",       recipients: 2, enabled: monthlyReport, onToggle: setMonthlyReport },
    { title: "Anomaly Alert",               schedule: "Trigger-based · Real-time",  recipients: 4, enabled: anomalyAlert, onToggle: setAnomalyAlert },
  ];

  return (
    <SectionCard color="#ff8c69" eyebrow="Automated Reports" title="Notifications">
      <div className="space-y-0">
        {schedules.map((s) => (
          <div key={s.title} className="flex items-start justify-between py-5 border-b border-[#f1f3f4] last:border-0">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.enabled ? "bg-[#5e8fff]" : "bg-[#f1f3f4]"}`}>
                <Calendar className={`w-5 h-5 ${s.enabled ? "text-white" : "text-[#9aa0a6]"}`} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1f1f1f] mb-1">{s.title}</div>
                <div className="flex items-center gap-3 text-xs text-[#9aa0a6]">
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.schedule}</div>
                  <div className="flex items-center gap-1"><Mail className="w-3 h-3" />{s.recipients} recipients</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Toggle enabled={s.enabled} onChange={s.onToggle} />
              <button className="text-xs text-[#9aa0a6] hover:text-[#1f1f1f] transition-colors font-medium">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SecurityTab() {
  const members = [
    { name: "Sarah Chen",       email: "sarah.chen@company.com",   role: "Owner",   status: "active",  color: "#5e8fff" },
    { name: "Michael Rodriguez",email: "michael.r@company.com",    role: "Admin",   status: "active",  color: "#b8a3ff" },
    { name: "Emily Johnson",    email: "emily.j@company.com",       role: "Analyst", status: "active",  color: "#ff8c69" },
    { name: "David Park",       email: "david.park@company.com",    role: "Viewer",  status: "pending", color: "#ffb3d9" },
  ];

  return (
    <SectionCard
      color="#b8a3ff"
      eyebrow="Access & Security"
      title="Team Members"
      action={
        <button className="px-5 py-2.5 bg-[#1f1f1f] text-white rounded-full text-sm hover:bg-[#3c4043] transition-colors font-medium">
          Invite Member
        </button>
      }
    >
      <div className="space-y-0">
        {members.map((m) => (
          <div key={m.email} className="flex items-center justify-between py-4 border-b border-[#f1f3f4] last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: m.color }}>
                <span className="text-sm font-bold text-[#1f1f1f]">{m.name.split(" ").map((n) => n[0]).join("")}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1f1f1f]">{m.name}</div>
                <div className="text-xs font-mono text-[#9aa0a6]">{m.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                m.status === "active" ? "bg-[#e6f9f0] text-[#1a7a4a]" : "bg-[#f8f9fa] text-[#9aa0a6]"
              }`}>{m.status}</div>
              <div className="w-16 text-sm text-[#5f6368] font-medium">{m.role}</div>
              <button className="text-xs text-[#9aa0a6] hover:text-[#1f1f1f] transition-colors font-medium">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function DataTab() {
  return (
    <SectionCard color="#d4ff00" eyebrow="Data Sources" title="Data & Integrations">
      <div className="space-y-6">
        {[
          { name: "GA4 Pipeline",   desc: "Primary analytics data source",  status: "connected" as const, detail: "Events: 48 · Properties: 12 · Last sync: 09:00" },
          { name: "AdMob",          desc: "Mobile ad revenue integration",   status: "missing"   as const, detail: "OAuth not configured — using GA4 Fallback proxy" },
          { name: "Google Sheets",  desc: "Taxonomy & configuration source", status: "missing"   as const, detail: "Sheet URL not configured" },
          { name: "BigQuery",       desc: "Warehouse for historical data",   status: "pending"   as const, detail: "Pending dataset permissions" },
        ].map((source) => (
          <div key={source.name} className="flex items-center justify-between py-4 border-b border-[#f1f3f4] last:border-0">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                source.status === "connected" ? "bg-[#e6f9f0]" : source.status === "pending" ? "bg-[#fef9e6]" : "bg-[#f1f3f4]"
              }`}>
                <Database className={`w-5 h-5 ${
                  source.status === "connected" ? "text-[#1a7a4a]" : source.status === "pending" ? "text-[#92610a]" : "text-[#9aa0a6]"
                }`} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1f1f1f] mb-0.5">{source.name}</div>
                <div className="text-xs text-[#9aa0a6]">{source.desc}</div>
                <div className="text-xs font-mono text-[#9aa0a6] mt-0.5">{source.detail}</div>
              </div>
            </div>
            <button className={`flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-medium transition-colors ${
              source.status === "connected"
                ? "border-[#e8eaed] text-[#5f6368] hover:bg-[#f8f9fa]"
                : "border-[#5e8fff] text-[#5e8fff] hover:bg-[#eef4ff]"
            }`}>
              <Link2 className="w-3 h-3" />
              {source.status === "connected" ? "Configure" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

const TABS: { key: SettingsTab; label: string; icon: React.ElementType }[] = [
  { key: "workspace",     label: "Workspace",       icon: Database },
  { key: "notifications", label: "Notifications",   icon: Bell },
  { key: "security",      label: "Access & Security",icon: Shield },
  { key: "data",          label: "Data Sources",     icon: Link2 },
];

const STATUS_ITEMS = [
  { label: "Slack",     value: "미설정", status: "missing" as const },
  { label: "Gemini",    value: "미설정", status: "missing" as const },
  { label: "Taxonomy",  value: "미연결", status: "missing" as const },
  { label: "AdMob",     value: "미연결", status: "missing" as const },
];

const BASELINE_ITEMS = [
  { label: "리포트 기준일",        value: "2026-03-24" },
  { label: "앱 타임존",           value: "Asia/Seoul" },
  { label: "AdMob 레버뉴 타임존", value: "Asia/Seoul" },
  { label: "데이터 지연",         value: "D-2" },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("workspace");

  const renderTab = () => {
    if (activeTab === "workspace")     return <WorkspaceTab />;
    if (activeTab === "notifications") return <NotificationsTab />;
    if (activeTab === "security")      return <SecurityTab />;
    return <DataTab />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#e8eaed] px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Workspace</div>
            <h1 className="text-[#1f1f1f]">설정</h1>
            <p className="text-sm text-[#5f6368] mt-0.5">운영 기준, 연동 상태, audit 도구를 같은 visual language 안에서 정리합니다.</p>
            <div className="text-xs text-[#9aa0a6] mt-1 font-medium">Rectangles</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#e8eaed] text-sm text-[#5f6368] rounded-full hover:bg-[#f8f9fa] transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            상태 새로고침
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Main content */}
        <div className="flex-1 px-8 py-6">
          {/* Tab nav */}
          <div className="flex gap-1 mb-7 bg-[#f8f9fa] p-1 rounded-2xl w-fit">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    activeTab === t.key
                      ? "bg-white text-[#1f1f1f] shadow-sm"
                      : "text-[#5f6368] hover:text-[#1f1f1f]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {t.label}
                </button>
              );
            })}
          </div>
          {renderTab()}
        </div>

        {/* Right sidebar */}
        <aside className="w-64 border-l border-[#e8eaed] flex-shrink-0 px-6 py-6">
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-3">Workspace Overview</div>
            <h3 className="text-[#1f1f1f] mb-4">현재 상태</h3>
            {STATUS_ITEMS.map((s) => (
              <StatusRow key={s.label} label={s.label} value={s.value} status={s.status} />
            ))}
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-3">Operating Baseline</div>
            <h3 className="text-[#1f1f1f] mb-4">운영 기준</h3>
            {BASELINE_ITEMS.map((b) => (
              <div key={b.label} className="flex items-center justify-between py-2.5 border-b border-[#f1f3f4] last:border-0">
                <span className="text-xs text-[#5f6368]">{b.label}</span>
                <span className="text-xs font-mono font-semibold text-[#1f1f1f]">{b.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#f1f3f4]">
            <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-2">Quick Actions</div>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] rounded-2xl transition-colors text-left">
                <Key className="w-3.5 h-3.5 text-[#9aa0a6]" />
                <span className="text-xs text-[#5f6368] font-medium">API Key 설정</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] rounded-2xl transition-colors text-left">
                <Link2 className="w-3.5 h-3.5 text-[#9aa0a6]" />
                <span className="text-xs text-[#5f6368] font-medium">데이터 소스 연결</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
