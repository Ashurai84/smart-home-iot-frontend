/**
 * Home Page - Landing Page for SmartHome Hub
 * Modern SaaS-style landing page with hero, features, and CTA sections
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Thermometer, 
  Lock, 
  Gauge, 
  Shield, 
  LayoutDashboard,
  Clock,
  Cloud,
  Smartphone,
  UserPlus,
  PlusCircle,
  Sliders,
  GraduationCap,
  Users,
  Presentation,
  Server,
  Code,
  Database,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="gradient-text">SmartHome</span> Hub
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Control your home from anywhere, securely and in real-time.
              </p>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Manage all your smart devices from a single dashboard. Turn on lights, 
                adjust your AC, monitor sensors, and keep track of all activities — 
                all from your browser or phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/login" className="btn-outline flex items-center justify-center gap-2">
                  Login
                </Link>
              </div>
            </div>

            {/* Right - Device Mockup */}
            <div className="hidden lg:block animate-slide-up">
              <div className="relative">
                {/* Main dashboard mockup */}
                <div className="bg-card rounded-2xl shadow-elevated p-6 border border-border">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-warning" />
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span className="ml-4 text-sm text-muted-foreground">Dashboard</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Device cards preview */}
                    <div className="p-4 bg-secondary rounded-xl animate-float" style={{ animationDelay: '0s' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Lightbulb className="w-6 h-6 text-warning" />
                        <span className="text-sm font-medium text-foreground">Living Room</span>
                      </div>
                      <span className="text-xs text-success font-medium">● ON</span>
                    </div>
                    <div className="p-4 bg-secondary rounded-xl animate-float" style={{ animationDelay: '0.2s' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Thermometer className="w-6 h-6 text-primary" />
                        <span className="text-sm font-medium text-foreground">Bedroom AC</span>
                      </div>
                      <span className="text-xs text-foreground">24°C • Cool</span>
                    </div>
                    <div className="p-4 bg-secondary rounded-xl animate-float" style={{ animationDelay: '0.4s' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Lock className="w-6 h-6 text-success" />
                        <span className="text-sm font-medium text-foreground">Front Door</span>
                      </div>
                      <span className="text-xs text-success font-medium">● Locked</span>
                    </div>
                    <div className="p-4 bg-secondary rounded-xl animate-float" style={{ animationDelay: '0.6s' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Gauge className="w-6 h-6 text-accent" />
                        <span className="text-sm font-medium text-foreground">Temperature</span>
                      </div>
                      <span className="text-xs text-muted-foreground">28°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-2xl flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-sm text-primary font-medium mb-2">Step 1</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account in seconds with just your email and password.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-2xl flex items-center justify-center">
                <PlusCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-sm text-primary font-medium mb-2">Step 2</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Add Your Devices</h3>
              <p className="text-muted-foreground">
                Add lights, ACs, TVs, sensors, door locks, and more to your dashboard.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-2xl flex items-center justify-center">
                <Sliders className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-sm text-primary font-medium mb-2">Step 3</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Control Everything</h3>
              <p className="text-muted-foreground">
                Toggle devices, adjust AC settings, and monitor activity from anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES SECTION ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your smart home
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card-hover">
              <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure Login</h3>
              <p className="text-muted-foreground text-sm">
                JWT-based authentication keeps your account and devices secure.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-hover">
              <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Device Dashboard</h3>
              <p className="text-muted-foreground text-sm">
                View and control all your devices from a single, intuitive dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-hover">
              <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AC Controls</h3>
              <p className="text-muted-foreground text-sm">
                Adjust temperature and modes for your air conditioners remotely.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card-hover">
              <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Activity Logs</h3>
              <p className="text-muted-foreground text-sm">
                Track all device activities with detailed timestamps and history.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card-hover">
              <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Cloud-Hosted</h3>
              <p className="text-muted-foreground text-sm">
                Backend hosted on Render with MongoDB Atlas for reliable performance.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card-hover">
              <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Responsive UI</h3>
              <p className="text-muted-foreground text-sm">
                Works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO IS THIS FOR SECTION ===== */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Who Is This For?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Perfect for learners, families, and presentations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Use case 1 */}
            <div className="card-base text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Students</h3>
              <p className="text-muted-foreground">
                Perfect for learning full-stack development with React, Node.js, and MongoDB.
              </p>
            </div>

            {/* Use case 2 */}
            <div className="card-base text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Families</h3>
              <p className="text-muted-foreground">
                Control your home devices remotely for convenience and peace of mind.
              </p>
            </div>

            {/* Use case 3 */}
            <div className="card-base text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                <Presentation className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">B.Tech Projects</h3>
              <p className="text-muted-foreground">
                A complete, professional demo project perfect for presentations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Tech Stack
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern, industry-standard technologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Backend */}
            <div className="card-base">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Backend</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Node.js & Express</li>
                <li>• MongoDB Atlas</li>
                <li>• JWT Authentication</li>
                <li>• Hosted on Render</li>
              </ul>
            </div>

            {/* Frontend */}
            <div className="card-base">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Frontend</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• React with TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Axios for API calls</li>
                <li>• React Router v6</li>
              </ul>
            </div>

            {/* APIs */}
            <div className="card-base">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">APIs</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Auth (Login/Register)</li>
                <li>• Devices CRUD</li>
                <li>• AC Settings Control</li>
                <li>• Activity Logs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Control Your Smart Home?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join now and start managing your devices from anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="btn-secondary flex items-center justify-center gap-2">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 SmartHome Hub — Built by Ashutosh Rai</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
