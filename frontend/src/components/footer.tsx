import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-xl font-bold text-blue-600">
              Apni Watch Party
            </a>
            <p className="text-sm text-gray-600 mt-1">
              &copy; {new Date().getFullYear()} Apni Watch Party. All rights
              reserved.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <a
              href="/about"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              About
            </a>
            <a
              href="/privacy"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Contact Us
            </a>
          </nav>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600"
            >
              <span className="sr-only">Facebook</span>
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
            >
              <span className="sr-only">Twitter</span>
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-600"
            >
              <span className="sr-only">Instagram</span>
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-600"
            >
              <span className="sr-only">YouTube</span>
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
