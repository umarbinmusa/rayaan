import { Link } from "react-router-dom";
import { 
  Calendar, 
  UserCheck, 
  Pill, 
  ShieldAlert, 
  LayoutDashboard, 
  ShieldCheck, 
  User, 
  Stethoscope, 
  Shield, 
  ArrowRight 
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans">
      
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              NAGWALE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">
              Sign In
            </Link>
            <Link to="/signup" className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-6">
            Next-Gen Health ERP
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            NAGWALE Healthcare <br/>
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
              Management System
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Book appointments, manage consultations, buy drugs, and run your
            healthcare facility efficiently — all inside a single unified environment.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/10 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
            >
              Live Demo
            </Link>
          </div>

          {/* Mini Trust Stats Bar */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-8 border-t border-white/10 text-center">
            <div>
              <div className="text-xl md:text-2xl font-bold text-white">99.9%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Uptime</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-white">Zero</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Paperwork</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-white">256-bit</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Encryption</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Core Platform Features
            </h2>
            <p className="text-slate-500">
              Everything you need to streamline medical workflows, coordinate staff, and elevate patient care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Feature
              icon={<Calendar className="w-6 h-6 text-indigo-600" />}
              title="Appointment Booking"
              desc="Patients can securely book appointments, choose preferences, and track real-time approval status."
            />
            <Feature
              icon={<Stethoscope className="w-6 h-6 text-indigo-600" />}
              title="Consultation Hub"
              desc="Doctors can smoothly process digital health charts, manage active consultations, and issue electronic prescriptions."
            />
            <Feature
              icon={<Pill className="w-6 h-6 text-indigo-600" />}
              title="Smart Pharmacy"
              desc="Fulfill medication workflows, track live pharmaceutical inventories, and generate instant receipts."
            />
            <Feature
              icon={<ShieldAlert className="w-6 h-6 text-indigo-600" />}
              title="Role-Based Access"
              desc="Isolated, security-focused custom command centers built distinctively for Admins, Consultants, and Patients."
            />
            <Feature
              icon={<LayoutDashboard className="w-6 h-6 text-indigo-600" />}
              title="ERP Dashboard"
              desc="Gain centralized system visibility into real-time facility logistics, operational data, and patient loads."
            />
            <Feature
              icon={<ShieldCheck className="w-6 h-6 text-indigo-600" />}
              title="Secure & Compliant"
              desc="Enterprise-grade JWT authentication structures matched with ironclad, granular authorization profiles."
            />
          </div>
        </div>
      </section>

      {/* ================= USERS ================= */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Tailored Portals for Everyone
            </h2>
            <p className="text-slate-500">
              A comprehensive software experience mapped strictly to individual stakeholder responsibilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <UserCard
              icon={<User className="w-5 h-5" />}
              title="Patients"
              desc="Book appointments instantly, check consultation notes on demand, purchase medicines safely, and view personal diagnostic data histories."
              accentColor="border-t-emerald-500"
            />
            <UserCard
              icon={<Stethoscope className="w-5 h-5" />}
              title="Consultants"
              desc="Approve inbound schedules, dictate structured digital assessments, write active prescriptions, and maintain complete clinical focus."
              accentColor="border-t-indigo-500"
            />
            <UserCard
              icon={<Shield className="w-5 h-5" />}
              title="Administrators"
              desc="Full-scale configuration over access control, credentialing, drug registers, comprehensive database visibility, and site audits."
              accentColor="border-t-blue-500"
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 mb-16">
            Simple 4-Step Process
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            <Step number="01" text="Create a secure platform account" />
            <Step number="02" text="Set schedules or find required clinicians" />
            <Step number="03" text="Execute medical evaluation pipelines" />
            <Step number="04" text="Access central archival records seamlessly" />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Start Managing Healthcare Smarter Today
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Empower your hospital, standalone clinic, or health enterprise network with our rapid ERP software deployment.
          </p>

          <Link
            to="/signup"
            className="inline-flex bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all duration-200 shadow-md shadow-black/10 hover:-translate-y-0.5"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500/10 p-1.5 rounded text-indigo-400">
              <Stethoscope className="w-4 h-4" />
            </div>
            <span className="font-bold text-white tracking-wide">NAGWALE Health ERP</span>
          </div>
          <p className="text-slate-500">
            © {new Date().getFullYear()} NAGWALE Health Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ================= SMALL UI COMPONENTS ================= */

function Feature({ icon, title, desc }) {
  return (
    <div className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300">
      <div className="bg-slate-50 p-3 rounded-xl w-fit group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-300 mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function UserCard({ icon, title, desc, accentColor }) {
  return (
    <div className={`bg-white p-8 rounded-2xl border border-slate-100 border-t-4 ${accentColor} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-slate-400 bg-slate-50 p-2 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed flex-grow">{desc}</p>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div className="relative bg-slate-50/50 p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="text-xs font-black tracking-widest text-indigo-500/40 uppercase mb-3">
        Step {number}
      </div>
      <p className="text-slate-700 text-sm font-medium leading-relaxed">{text}</p>
    </div>
  );
}