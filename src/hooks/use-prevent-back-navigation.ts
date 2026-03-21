import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function usePreventBackNavigation() {
  const router = useRouter();

  useEffect(() => {
    // Push a new entry onto the history stack to prevent going back
    window.history.pushState(null, '', window.location.href);

    // Handle back button press
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      // Push the state again to keep the user on the current page
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);
}
