import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Ar-Rayhaan Healthcare Management System
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Book appointments, manage consultations, buy drugs, and run your
            healthcare facility efficiently — all in one system.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Core Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              title="Appointment Booking"
              desc="Patients can book appointments easily and track approval status in real time."
            />
            <Feature
              title="Consultation Management"
              desc="Doctors and consultants manage patient consultations with prescriptions."
            />
            <Feature
              title="Drug Management"
              desc="Buy drugs, manage inventory, generate purchase receipts and history."
            />
            <Feature
              title="Role-Based Access"
              desc="Secure dashboards for Admins, Consultants, and Patients."
            />
            <Feature
              title="ERP Dashboard"
              desc="Centralized healthcare operations with full system visibility."
            />
            <Feature
              title="Secure & Reliable"
              desc="JWT authentication and role-based authorization."
            />
          </div>
        </div>
      </section>

      {/* ================= USERS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Who Can Use This System?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <UserCard
              title="Patients"
              desc="Book appointments, view consultations, buy drugs, and track history."
            />
            <UserCard
              title="Consultants"
              desc="Approve appointments, manage consultations, and prescribe treatments."
            />
            <UserCard
              title="Administrators"
              desc="Manage users, assign consultants, drugs, and oversee operations."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <Step number="1" text="Create an account" />
            <Step number="2" text="Book appointment or manage patients" />
            <Step number="3" text="Consultation & approval process" />
            <Step number="4" text="Access records & history" />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Start Managing Healthcare Smarter
        </h2>
        <p className="mb-8">
          Join hospitals, clinics, and health centers using our ERP system.
        </p>

        <Link
          to="/signup"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Create Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        <p>
          © {new Date().getFullYear()} Ar-Rayhaan Health ERP. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Feature({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function UserCard({ title, desc }) {
  return (
    <div className="p-6 border rounded-xl">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="text-indigo-600 text-3xl font-bold mb-2">
        {number}
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
