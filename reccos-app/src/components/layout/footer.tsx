import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-brand-cream">
      <div className="container py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-brand-olive">Reccos by Fitin</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-brand-olive/70 hover:text-brand-olive">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-brand-olive/70 hover:text-brand-olive">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-brand-olive">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-brand-olive/70 hover:text-brand-olive">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/my-diet" className="text-sm text-brand-olive/70 hover:text-brand-olive">
                  My Diet
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-brand-olive">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-brand-olive/70 hover:text-brand-olive">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-brand-olive/70 hover:text-brand-olive">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-brand-olive">Fitin Club</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://fitin.club" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-brand-olive/70 hover:text-brand-olive"
                >
                  Join Fitin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-brand-olive/70">
            © {currentYear} Fitin Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 