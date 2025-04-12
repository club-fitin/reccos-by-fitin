import { PlatformLink } from '@/types';

interface PlatformLinksProps {
  links: PlatformLink[];
}

export default function PlatformLinks({ links }: PlatformLinksProps) {
  if (!links || links.length === 0) {
    return null;
  }
  
  // Define common platform icons (for popular retailers)
  const platformIcons: Record<string, React.ReactNode> = {
    amazon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.578-1.124-.815-1.775-.815-1.205 0-2.277.618-2.54 1.897-.056.285-.27.564-.567.578l-3.14-.339c-.262-.056-.555-.283-.481-.703.717-3.758 4.129-4.887 7.176-4.887 1.567 0 3.614.42 4.845 1.61 1.567 1.466 1.416 3.423 1.416 5.552v5.023c0 1.512.63 2.178 1.225 2.996.209.287.256.63-.009.839-.667.556-1.851 1.585-2.501 2.163l-.009-.007z" />
        <path d="M21.207 17.293c-1.15.991-2.833 1.534-4.278 1.534-2.029 0-3.858-.753-5.242-2.003-1.524 1.552-2.318 1.909-4.089 1.909-2.126 0-3.767-1.325-3.767-3.32 0-2.08 1.334-3.139 2.659-3.772 1.144-.544 2.731-.631 4.219-.739v-.372c0-.499.037-1.086-.3-1.517-.288-.372-.826-.528-1.318-.528-.927 0-1.757.488-1.961 1.5-.044.213-.214.422-.446.433l-2.443-.262c-.202-.044-.431-.198-.374-.491.56-2.939 3.262-3.824 5.673-3.824 1.229 0 2.842.326 3.813 1.254 1.228 1.146 1.109 2.675 1.109 4.343v3.939c0 1.182.488 1.7.947 2.338.161.222.195.484-.11.651-.518.436-1.438 1.269-1.944 1.735l-.009-.008z" />
      </svg>
    ),
    flipkart: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.574 3.334l-.94 4.797h1.905l.56-2.778s.127-.697.736-.697h1.175l.125-.625S7.444 3.334 6.07 3.334H4.574zm6.27 0l-.94 4.797h1.904l.94-4.797H10.84zm5.678 0s-1.48 0-2.147 1.375c-.94 1.932-2.148 4.797-2.148 4.797h1.815s1.152-2.778 1.258-3.144h1.44l.255-1.375H15.53l.193-.931c.064-.29.256-.736.886-.736h1.068l.127-.625s-.514-.361-1.284-.361zM3.51 8.13l-.94 4.798h1.904l.376-1.835h.736c.448 0 .376.25.34.437l-.284 1.398h1.87s.196-1.208.268-1.723c.072-.514-.052-1.123-1.36-1.123h-1.07l.125-.625s.14-.618.82-.618h1.464l.24-1.209H6.093c-1.445 0-2.148.94-2.264 1.167-.117.228-.32.334-.32.334zm6.33.001l-.94 4.797h1.904l.94-4.797h-1.905zm2.43 0l-.94 4.797h1.632l.43-2.282h.704c.405 0 .535.194.497.54l-.36 1.742h1.632l.434-2.148c.114-.514-.06-.761-.33-.888.33-.09 1.06-.367 1.4-1.507.167-.558-.063-.892-.395-1.07-.33-.179-.914-.184-1.4-.184h-3.305zm1.6 1.1h1.07c.29 0 .57.048.49.471-.081.424-.45.62-1.13.62h-.79l.36-1.09z" />
      </svg>
    ),
    instacart: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-3.935 6.508l4.243-1.176a.5.5 0 0 1 .607.489l-.007 5.683a.5.5 0 0 1-.361.488l-4.243 1.175a.5.5 0 0 1-.607-.489l.007-5.683a.5.5 0 0 1 .361-.487zm8.476 6.425h-2.618a.5.5 0 0 1-.498-.5V8.501a.5.5 0 0 1 .498-.501h2.618a.5.5 0 0 1 .498.501v5.932a.5.5 0 0 1-.498.5z" />
      </svg>
    ),
    walmart: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.982 7.992c-.339-.929-1.338-1.59-2.536-1.59-.819 0-1.659.328-2.276.895-1.358-2.717-3.756-4.14-6.208-4.14-2.433 0-4.815 1.404-6.169 4.077-.651-.61-1.514-.927-2.377-.927-.884 0-1.759.317-2.339.874C-1.537 8.922.86 12.01 1.594 13.023c-.325.919-.497 1.845-.497 2.753 0 4.295 6.617 5.931 11.044 5.931.341 0 .686-.005 1.033-.02 4.977-.219 10.32-2.029 10.32-6.104 0-.31-.02-.625-.06-.941.419-1.138 1.008-3.097-.452-6.65zm-3.171 10.149c-1.513.964-3.237 1.59-5.13 1.855-1.2.168-2.403.179-3.609.031-1.965-.241-3.874-.796-5.211-1.804-1.252-.944-1.92-2.157-1.92-3.501 0-.795.221-1.596.67-2.375.337.078.687.119 1.039.119.66 0 1.313-.132 1.91-.39.052 2.816 1.731 5.471 4.521 7.19.504.312 1.007.583 1.519.833l.55.093c-.154.03-.328.044-.57.044-4.525 0-9.752-1.411-9.752-4.639 0-.701.154-1.444.459-2.206.752-1.887 2.486-3.108 4.406-3.108 1.235 0 2.408.468 3.33 1.321l.499.46.212-.641c.601-1.824 1.536-3.424 2.779-4.354.825-.618 1.733-.958 2.551-.958 1.75 0 3.534 1.296 4.724 3.437l.26.467.417-.328c.471-.369 1.068-.572 1.702-.572 1.295 0 1.597.731 1.675.933.608 1.665.312 2.84.008 3.761l-.176.529.163.532c.026.085.049.187.07.295-1.434-.55-3.217-.471-4.682.231-1.454.698-2.314 1.971-2.295 3.397l.004.269.212-.168c.354-.28.761-.49 1.207-.625.414-.125.843-.188 1.274-.188.678 0 1.369.146 2.025.434-1.225 1.451-3.12 2.457-5.221 3.191z" />
      </svg>
    ),
    wholefoods: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3.75c-4.56 0-8.25 3.69-8.25 8.25s3.69 8.25 8.25 8.25 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75zM18.75 12c0 1.27-.28 2.46-.77 3.53-1.07-.67-2.43-1.07-3.91-1.07-.74 0-1.43.13-2.08.36-.6-.67-1.1-1.42-1.51-2.24.69-.99 1.53-1.75 2.51-2.18.75-.33 1.52-.47 2.32-.41.79.05 1.58.32 2.32.8.7.5 1.32 1.11 1.12 1.21z" />
      </svg>
    ),
  };
  
  // Get platform name from URL
  const getPlatformName = (url: string): string => {
    try {
      const hostname = new URL(url).hostname;
      if (hostname.includes('amazon')) return 'Amazon';
      if (hostname.includes('flipkart')) return 'Flipkart';
      if (hostname.includes('instacart')) return 'Instacart';
      if (hostname.includes('walmart')) return 'Walmart';
      if (hostname.includes('wholefoods')) return 'Whole Foods';
      
      // Extract domain name without TLD
      const domainParts = hostname.split('.');
      if (domainParts.length >= 2) {
        return domainParts[domainParts.length - 2].charAt(0).toUpperCase() + 
               domainParts[domainParts.length - 2].slice(1);
      }
      
      return 'Visit Site';
    } catch (e) {
      return 'Visit Site';
    }
  };
  
  // Get icon for platform
  const getPlatformIcon = (url: string): React.ReactNode => {
    try {
      const hostname = new URL(url).hostname;
      if (hostname.includes('amazon')) return platformIcons.amazon;
      if (hostname.includes('flipkart')) return platformIcons.flipkart;
      if (hostname.includes('instacart')) return platformIcons.instacart;
      if (hostname.includes('walmart')) return platformIcons.walmart;
      if (hostname.includes('wholefoods')) return platformIcons.wholefoods;
      
      // Default icon for unknown platforms
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      );
    } catch (e) {
      // Default icon for invalid URLs
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      );
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {links.map((link, index) => {
        const displayName = link.name || getPlatformName(link.url);
        const icon = getPlatformIcon(link.url);
        
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-600">{icon}</span>
            <span>{displayName}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      })}
    </div>
  );
} 