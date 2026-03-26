import { Bell, Shield, Users, Database, Mail, Calendar, Clock } from "lucide-react";

export function Settings() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#e8eaed]">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">Settings</h1>
              <p className="text-[#5f6368] text-sm">Manage workspace preferences and access controls</p>
            </div>
            <button className="px-5 py-2.5 bg-[#1f1f1f] text-white rounded-full text-sm hover:bg-[#3c4043] transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-[1200px]">
        <div className="grid grid-cols-12 gap-6">
          {/* Navigation */}
          <nav className="col-span-3">
            <div className="sticky top-8 bg-white rounded-3xl p-4 border border-[#e8eaed]">
              <div className="text-xs uppercase tracking-wider text-[#5f6368] mb-3 px-3 font-medium">
                Settings
              </div>
              <ul className="space-y-1">
                <NavItem icon={Users} label="Workspace" active />
                <NavItem icon={Bell} label="Notifications" />
                <NavItem icon={Shield} label="Access & Security" />
                <NavItem icon={Database} label="Data Sources" />
                <NavItem icon={Mail} label="Email Reports" />
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Workspace Settings */}
            <section>
              <div className="bg-[#ffb3d9] rounded-[40px] overflow-hidden">
                <div className="px-8 py-6">
                  <h2 className="mb-2 text-[#1f1f1f]">Workspace Information</h2>
                  <p className="text-sm text-[#1f1f1f] opacity-80">
                    Basic details about your analytics workspace
                  </p>
                </div>
                <div className="bg-white p-8 rounded-t-[40px] space-y-6">
                  <SettingField
                    label="Workspace Name"
                    value="Global Operations"
                    description="This appears in the sidebar and report exports"
                  />
                  <SettingField
                    label="Organization ID"
                    value="ORG-MTT-24601"
                    description="Unique identifier for API access and integrations"
                    readOnly
                  />
                  <SettingField
                    label="Primary Region"
                    value="North America (US-East)"
                    description="Data processing and storage region"
                  />
                  <SettingField
                    label="Timezone"
                    value="UTC-05:00 (Eastern Time)"
                    description="Used for report generation and scheduled exports"
                  />
                </div>
              </div>
            </section>

            {/* Team & Access */}
            <section>
              <div className="bg-[#00f5a0] rounded-[40px] overflow-hidden">
                <div className="px-8 py-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="mb-2 text-[#1f1f1f]">Team Members</h2>
                      <p className="text-sm text-[#1f1f1f] opacity-80">
                        Manage workspace access and permissions
                      </p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#1f1f1f] text-white rounded-full text-sm hover:bg-[#3c4043] transition-colors font-medium">
                      Invite Member
                    </button>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-t-[40px]">
                  <div className="space-y-4">
                    <TeamMember
                      name="Sarah Chen"
                      email="sarah.chen@company.com"
                      role="Owner"
                      status="active"
                      color="#5e8fff"
                    />
                    <TeamMember
                      name="Michael Rodriguez"
                      email="michael.r@company.com"
                      role="Admin"
                      status="active"
                      color="#b8a3ff"
                    />
                    <TeamMember
                      name="Emily Johnson"
                      email="emily.j@company.com"
                      role="Analyst"
                      status="active"
                      color="#ff8c69"
                    />
                    <TeamMember
                      name="David Park"
                      email="david.park@company.com"
                      role="Viewer"
                      status="pending"
                      color="#ffb3d9"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Report Preferences */}
            <section>
              <div className="bg-[#ff8c69] rounded-[40px] overflow-hidden">
                <div className="px-8 py-6">
                  <h2 className="mb-2 text-[#1f1f1f]">Automated Reports</h2>
                  <p className="text-sm text-[#1f1f1f] opacity-80">
                    Configure scheduled briefings and exports
                  </p>
                </div>
                <div className="bg-white p-8 rounded-t-[40px] space-y-6">
                  <ReportSchedule
                    title="Weekly Performance Briefing"
                    schedule="Every Monday at 09:00 EST"
                    recipients={3}
                    enabled
                  />
                  <ReportSchedule
                    title="Daily Metrics Summary"
                    schedule="Every day at 08:00 EST"
                    recipients={5}
                    enabled
                  />
                  <ReportSchedule
                    title="Monthly Executive Report"
                    schedule="First Monday of each month at 10:00 EST"
                    recipients={2}
                    enabled={false}
                  />
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <div className="bg-[#b8a3ff] rounded-[40px] overflow-hidden">
                <div className="px-8 py-6">
                  <h2 className="mb-2 text-[#1f1f1f]">Data & Privacy</h2>
                  <p className="text-sm text-[#1f1f1f] opacity-80">
                    Configure data retention and compliance settings
                  </p>
                </div>
                <div className="bg-white p-8 rounded-t-[40px] space-y-6">
                  <div className="flex items-start justify-between py-4">
                    <div className="flex-1">
                      <h4 className="mb-1">Data Retention Period</h4>
                      <p className="text-sm text-[#5f6368]">
                        Analytics data is retained for 24 months
                      </p>
                    </div>
                    <div className="font-mono text-sm text-[#1f1f1f] bg-[#f8f9fa] px-3 py-1.5 rounded-full">
                      24 months
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-4 border-t border-[#e8eaed]">
                    <div className="flex-1">
                      <h4 className="mb-1">Audit Log Retention</h4>
                      <p className="text-sm text-[#5f6368]">
                        User activity logs are retained for compliance
                      </p>
                    </div>
                    <div className="font-mono text-sm text-[#1f1f1f] bg-[#f8f9fa] px-3 py-1.5 rounded-full">
                      36 months
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-4 border-t border-[#e8eaed]">
                    <div className="flex-1">
                      <h4 className="mb-1">Export History</h4>
                      <p className="text-sm text-[#5f6368]">
                        Report exports are stored for reference
                      </p>
                    </div>
                    <div className="font-mono text-sm text-[#1f1f1f] bg-[#f8f9fa] px-3 py-1.5 rounded-full">
                      12 months
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <li>
      <button
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 text-left
          ${active 
            ? 'bg-[#5e8fff] text-white' 
            : 'text-[#5f6368] hover:bg-[#f8f9fa] hover:text-[#1f1f1f]'
          }
        `}
      >
        <Icon className="w-4 h-4" strokeWidth={active ? 2 : 1.5} />
        <span className="text-sm font-medium">{label}</span>
      </button>
    </li>
  );
}

function SettingField({ 
  label, 
  value, 
  description, 
  readOnly = false 
}: { 
  label: string; 
  value: string; 
  description: string; 
  readOnly?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-sm font-medium text-[#1f1f1f] mb-1 block">{label}</span>
        <input
          type="text"
          value={value}
          readOnly={readOnly}
          className={`
            w-full px-4 py-2.5 border border-[#e8eaed] rounded-2xl text-sm
            ${readOnly 
              ? 'bg-[#f8f9fa] text-[#5f6368]' 
              : 'bg-white focus:outline-none focus:ring-2 focus:ring-[#5e8fff] focus:border-transparent'
            }
          `}
        />
      </label>
      <p className="text-xs text-[#5f6368]">{description}</p>
    </div>
  );
}

function TeamMember({ 
  name, 
  email, 
  role, 
  status,
  color
}: { 
  name: string; 
  email: string; 
  role: string; 
  status: "active" | "pending";
  color: string;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#e8eaed] last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
          <span className="text-sm font-bold text-[#1f1f1f]">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-medium text-[#1f1f1f] mb-0.5">{name}</div>
          <div className="text-xs font-mono text-[#5f6368]">{email}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
          status === "active" 
            ? "bg-[#00f5a0] text-[#1f1f1f]" 
            : "bg-[#f8f9fa] text-[#5f6368]"
        }`}>
          {status}
        </div>
        <div className="min-w-[80px] text-sm text-[#5f6368] font-medium">{role}</div>
        <button className="text-xs text-[#5f6368] hover:text-[#1f1f1f] transition-colors font-medium">
          Manage
        </button>
      </div>
    </div>
  );
}

function ReportSchedule({ 
  title, 
  schedule, 
  recipients, 
  enabled 
}: { 
  title: string; 
  schedule: string; 
  recipients: number; 
  enabled: boolean;
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-[#e8eaed] last:border-0">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
          enabled 
            ? 'bg-[#5e8fff]' 
            : 'bg-[#f8f9fa]'
        }`}>
          <Calendar className={`w-5 h-5 ${enabled ? 'text-white' : 'text-[#5f6368]'}`} />
        </div>
        <div>
          <h4 className="mb-1">{title}</h4>
          <div className="flex items-center gap-3 text-xs text-[#5f6368]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {schedule}
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              {recipients} recipients
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={enabled} readOnly className="sr-only peer" />
          <div className={`w-11 h-6 rounded-full transition-all duration-200 ${
            enabled ? 'bg-[#5e8fff]' : 'bg-[#dadce0]'
          }`}>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              enabled ? 'translate-x-5' : 'translate-x-0'
            }`}></div>
          </div>
        </label>
        <button className="text-xs text-[#5f6368] hover:text-[#1f1f1f] transition-colors font-medium">
          Edit
        </button>
      </div>
    </div>
  );
}
