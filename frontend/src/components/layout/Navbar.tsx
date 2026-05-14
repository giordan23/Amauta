import { Link, useLocation } from 'react-router';
import { LogOut, Home, History, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';
import '@/styles/app-layout.css';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/app/home', label: 'Home', icon: Home },
    { path: '/app/exam/history', label: 'Historial', icon: History },
    { path: '/app/profile', label: 'Perfil', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="nav-desktop app-header hide-mobile">
        <div className="nav-logo">
          <Link to="/app/home" className="nav-brand">
            <span className="nav-brand-text">Amauta</span>
          </Link>
        </div>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <link.icon className="nav-icon" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="nav-user">
          <div className="nav-user-info">
            <span className="nav-user-email">{user?.email}</span>
          </div>
          <button onClick={handleLogout} className="nav-logout" title="Cerrar sesión">
            <LogOut className="nav-icon" />
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="nav-mobile app-header hide-desktop">
        <div className="nav-mobile-left">
          <Link to="/app/home" className="nav-brand">
            <span className="nav-brand-text">Amauta</span>
          </Link>
        </div>

        <div className="nav-mobile-right">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-hamburger"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="nav-brand-text">Amauta</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mobile-nav-footer">
              <div className="mobile-user-info">
                <span className="nav-user-email">{user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Cerrar sesión</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}