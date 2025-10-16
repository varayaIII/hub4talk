// src/components/layout/Footer.jsx
import { Globe, Github, Twitter, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1b2229] bg-[#12181d]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo y Copyright */}
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#E0C3A4]" />
            <span className="text-[#E0C3A4] font-semibold text-sm">Hub4Talk</span>
            <span className="text-gray-600 text-xs">
              © {currentYear}
            </span>
          </div>

          {/* Redes Sociales */}
          <div className="flex items-center gap-4">
            <a 
              href="https://twitter.com/hub4talk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E0C3A4] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/hub4talk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E0C3A4] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com/hub4talk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E0C3A4] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com/hub4talk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E0C3A4] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/company/hub4talk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E0C3A4] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com/@hub4talk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E0C3A4] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#privacy" className="hover:text-[#E0C3A4] transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-[#E0C3A4] transition-colors">
              Terms
            </a>
            <a href="#contact" className="hover:text-[#E0C3A4] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}