import { Bell, Shield, Users, Database, Mail, Calendar, Clock } from "lucide-react";

export function Settings() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafbfc' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">Settings</h1>
              <p className="text-[#6b7280] text-sm">Manage workspace preferences and access controls</p>
            </div>
            <button className="px-4 py-2.5 bg-gradient-to-r from-[#4285f4] to-[#9334e9] text-white rounded-xl text-sm hover:shadow-lg transition-all duration-200 font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-[1200px]">
        <div className="grid grid-cols-12 gap-6">
          {/* Navigation */}
          <nav className="col-span-3">
            <div className="sticky top-8 bg-white rounded-2xl p-4 border border-[#e5e7eb] shadow-sm">
              <div className="text-xs uppercase tracking-wider text-[#6b7280] mb-3 px-3 font-medium">
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
              <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="px-8 py-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#4285f4]/5 to-[#9334e9]/5">
                  <h2 className="mb-2">Workspace Information</h2>
                  <p className="text-sm text-[#6b7280]">
                    Basic details about your analytics workspace
                  </p>
                </div>
                <div className="p-8 space-y-6">
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
              <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="px-8 py-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#10b981]/5 to-[#059669]/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="mb-2">Team Members</h2>
                      <p className="text-sm text-[#6b7280]">
                        Manage workspace access and permissions
                      </p>
                    </div>
                    <button className="px-4 py-2.5 bg-gradient-to-r from-[#4285f4] to-[#9334e9] text-white rounded-xl text-sm hover:shadow-lg transition-all duration-200 font-medium">
                      Invite Member
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    <TeamMember
                      name="Sarah Chen"
                      email="sarah.chen@company.com"
                      role="Owner"
                      status="active"
                    />
                    <TeamMember
                      name="Michael Rodriguez"
                      email="michael.r@company.com"
                      role="Admin"
                      status="active"
                    />
                    <TeamMember
                      name="Emily Johnson"
                      email="emily.j@company.com"
                      role="Analyst"
                      status="active"
                    />
                    <TeamMember
                      name="David Park"
                      email="david.park@company.com"
                      role="Viewer"
                      status="pending"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Report Preferences */}
            <section>
              <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="px-8 py-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#ec4899]/5 to-[#f97316]/5">
                  <h2 className="mb-2">Automated Reports</h2>
                  <p className="text-sm text-[#6b7280]">
                    Configure scheduled briefings and exports
                  </p>
                </div>
                <div className="p-8 space-y-6">
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
              <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="px-8 py-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#9334e9]/5 to-[#ec4899]/5">
                  <h2 className="mb-2">Data & Privacy</h2>
                  <p className="text-sm text-[#6b7280]">
                    Configure data retention and compliance settings
                  </p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-start justify-between py-4">
                    <div className="flex-1">
                      <h4 className="mb-1">Data Retention Period</h4>
                      <p className="text-sm text-[#6b7280]">
                        Analytics data is retained for 24 months
                      </p>
                    </div>
                    <div className="font-mono text-sm text-[#111827] bg-gradient-to-r from-[#4285f4]/10 to-[#9334e9]/10 px-3 py-1.5 rounded-lg">
                      24 months
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-4 border-t border-[#e5e7eb]">
                    <div className="flex-1">
                      <h4 className="mb-1">Audit Log Retention</h4>
                      <p className="text-sm text-[#6b7280]">
                        User activity logs are retained for compliance
                      </p>
                    </div>
                    <div className="font-mono text-sm text-[#111827] bg-gradient-to-r from-[#10b981]/10 to-[#059669]/10 px-3 py-1.5 rounded-lg">
                      36 months
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-4 border-t border-[#e5e7eb]">
                    <div className="flex-1">
                      <h4 className="mb-1">Export History</h4>
                      <p className="text-sm text-[#6b7280]">
                        Report exports are stored for reference
                      </p>
                    </div>
                    <div className="font-mono text-sm text-[#111827] bg-gradient-to-r from-[#ec4899]/10 to-[#f97316]/10 px-3 py-1.5 rounded-lg">
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
          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left
          ${active 
            ? 'bg-gradient-to-r from-[#4285f4]/10 to-[#9334e9]/5 text-[#4285f4] shadow-sm' 
            : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]'
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
        <span className="text-sm font-medium text-[#111827] mb-1 block">{label}</span>
        <input
          type="text"
          value={value}
          readOnly={readOnly}
          className={`
            w-full px-4 py-2.5 border border-[#e5e7eb] rounded-xl text-sm
            ${readOnly 
              ? 'bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb]/50 text-[#6b7280]' 
              : 'bg-white focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent'
            }
          `}
        />
      </label>
      <p className="text-xs text-[#6b7280]">{description}</p>
    </div>
  );
}

function TeamMember({ 
  name, 
  email, 
  role, 
  status 
}: { 
  name: string; 
  email: string; 
  role: string; 
  status: "active" | "pending";
}) {
  const gradients = [
    'from-[#4285f4] to-[#9334e9]',
    'from-[#10b981] to-[#059669]',
    'from-[#ec4899] to-[#f97316]',
    'from-[#9334e9] to-[#ec4899]'
  ];
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#e5e7eb] last:border-0">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 bg-gradient-to-br ${randomGradient} rounded-xl flex items-center justify-center shadow-sm`}>
          <span className="text-sm font-bold text-white">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-medium text-[#111827] mb-0.5">{name}</div>
          <div className="text-xs font-mono text-[#6b7280]">{email}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${
          status === "active" 
            ? "bg-gradient-to-r from-[#10b981] to-[#059669] text-white" 
            : "bg-[#f3f4f6] text-[#6b7280]"
        }`}>
          {status}
        </div>
        <div className="min-w-[80px] text-sm text-[#6b7280] font-medium">{role}</div>
        <button className="text-xs text-[#6b7280] hover:text-[#4285f4] transition-colors font-medium">
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
    <div className="flex items-start justify-between py-4 border-b border-[#e5e7eb] last:border-0">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
          enabled 
            ? 'bg-gradient-to-br from-[#4285f4] to-[#9334e9]' 
            : 'bg-[#f3f4f6]'
        }`}>
          <Calendar className={`w-5 h-5 ${enabled ? 'text-white' : 'text-[#6b7280]'}`} />
        </div>
        <div>
          <h4 className="mb-1">{title}</h4>
          <div className="flex items-center gap-3 text-xs text-[#6b7280]">
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
            enabled ? 'bg-gradient-to-r from-[#4285f4] to-[#9334e9] shadow-sm' : 'bg-[#d1d5db]'
          }`}>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
              enabled ? 'translate-x-5' : 'translate-x-0'
            }`}></div>
          </div>
        </label>
        <button className="text-xs text-[#6b7280] hover:text-[#4285f4] transition-colors font-medium">
          Edit
        </button>
      </div>
    </div>
  );
}