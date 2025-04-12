import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/images/logo.svg"
        alt="Fitin Club"
        width={100}
        height={40}
        className="h-auto w-auto dark:hidden"
        priority
      />
      <Image
        src="/images/logo-dark.svg"
        alt="Fitin Club"
        width={100}
        height={40}
        className="hidden h-auto w-auto dark:block"
        priority
      />
    </Link>
  );
} 