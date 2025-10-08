'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIndicator from '@/components/PageIndicator';
import ScrollIndicator from '@/components/ScrollIndicator';
import ThemeRipple from '@/components/ThemeRipple';
import Page1 from '@/components/pages/Page1';
import Page2 from '@/components/pages/Page2';
import Page3 from '@/components/pages/Page3';
import Page4 from '@/components/pages/Page4';
import Page5 from '@/components/pages/Page5';
import Page6 from '@/components/pages/Page6';
import Page7 from '@/components/pages/Page7';

const TOTAL_PAGES = 7;

export default function MainPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mountedPages, setMountedPages] = useState(new Set([1]));
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { ripplePosition, isRippling } = useTheme();

  // Update mounted pages when current page changes (current + adjacent)
  useEffect(() => {
    const pagesToMount = new Set([
      currentPage,
      Math.max(1, currentPage - 1),
      Math.min(TOTAL_PAGES, currentPage + 1),
    ]);
    setMountedPages(pagesToMount);
  }, [currentPage]);

  const navigateToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > TOTAL_PAGES || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentPage(pageNumber);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  // Smooth scroll from page 1 or 2 to page 7 with animation through all pages
  const smoothScrollToPage7 = () => {
    if ((currentPage !== 1 && currentPage !== 2) || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Navigate through remaining pages to reach page 7
    const pagesToVisit = currentPage === 1 
      ? [2, 3, 4, 5, 6, 7]  // From page 1
      : [3, 4, 5, 6, 7];     // From page 2
    
    pagesToVisit.forEach((page, index) => {
      setTimeout(() => {
        setCurrentPage(page);
        
        // On the last page, reset transitioning state
        if (page === 7) {
          setTimeout(() => {
            setIsTransitioning(false);
          }, 800);
        }
      }, index * 120); // 120ms between each page transition - very fast!
    });
  };

  // Scroll handler for pages 1-6 (page navigation) and page 7 (normal scroll)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Page 7: Normal scrolling behavior
      if (currentPage === 7) {
        const container = document.getElementById('page-7-content');
        if (!container) return;

        const isAtTop = container.scrollTop === 0;
        
        // If scrolling up and at top, go to page 6
        if (e.deltaY < 0 && isAtTop) {
          e.preventDefault();
          navigateToPage(6);
        }
        // Otherwise allow normal scrolling
        return;
      }

      // Pages 1-6: Page navigation on scroll
      e.preventDefault();
      
      scrollTimeout.current = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scroll down - next page
          navigateToPage(currentPage + 1);
        } else {
          // Scroll up - previous page
          navigateToPage(currentPage - 1);
        }
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [currentPage, isTransitioning]);

  // Manage overscroll-behavior based on current page
  useEffect(() => {
    // Enable pull-to-refresh on Page 1, disable on other pages
    if (currentPage === 1) {
      document.documentElement.style.overscrollBehaviorY = 'auto';
      document.body.style.overscrollBehaviorY = 'auto';
    } else {
      document.documentElement.style.overscrollBehaviorY = 'none';
      document.body.style.overscrollBehaviorY = 'none';
    }

    return () => {
      // Cleanup: restore default
      document.documentElement.style.overscrollBehaviorY = 'none';
      document.body.style.overscrollBehaviorY = 'none';
    };
  }, [currentPage]);

  // Touch handlers for mobile with pull-to-refresh fix
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Critical: Manage pull-to-refresh behavior
      const currentY = e.touches[0].clientY;
      const diff = touchStartY.current - currentY;

      // Page 1: Allow pull-to-refresh ONLY when swiping down (nowhere to go back)
      if (currentPage === 1 && diff < 0) {
        // User is on page 1 and swiping down (trying to go previous)
        // Allow native browser pull-to-refresh
        return;
      }

      // For pages 1-6 (other cases), prevent pull-to-refresh for page navigation
      if (currentPage < 7) {
        e.preventDefault();
        return;
      }

      // For page 7, allow pull-to-refresh at the top when swiping down
      if (currentPage === 7) {
        const page7Container = document.getElementById('page-7-content');
        if (page7Container) {
          const isAtTop = page7Container.scrollTop === 0;
          if (isAtTop && diff < 0) {
            // At top of page 7, swiping down - allow pull-to-refresh
            return;
          }
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      const threshold = 50;

      // Page 7: Normal scroll behavior
      if (currentPage === 7) {
        const page7Container = document.getElementById('page-7-content');
        if (!page7Container) return;

        const isAtTop = page7Container.scrollTop === 0;
        
        // If swiping down and at top, go to page 6
        if (diff < -threshold && isAtTop) {
          e.preventDefault();
          navigateToPage(6);
        }
        return;
      }

      // Pages 1-6: Page navigation on swipe
      if (Math.abs(diff) > threshold) {
        e.preventDefault();
        if (diff > 0) {
          // Swipe up - next page
          navigateToPage(currentPage + 1);
        } else {
          // Swipe down - previous page
          navigateToPage(currentPage - 1);
        }
      }
    };

    // Use { passive: false } to allow preventDefault
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage, isTransitioning]);

  const pages = [
    { id: 1, component: <Page1 isActive={currentPage === 1} onScrollToPage7={smoothScrollToPage7} /> },
    { id: 2, component: <Page2 isActive={currentPage === 2} onScrollToPage7={smoothScrollToPage7} /> },
    { id: 3, component: <Page3 isActive={currentPage === 3} /> },
    { id: 4, component: <Page4 isActive={currentPage === 4} /> },
    { id: 5, component: <Page5 isActive={currentPage === 5} /> },
    { id: 6, component: <Page6 isActive={currentPage === 6} /> },
    { id: 7, component: <Page7 isActive={currentPage === 7} /> },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <ThemeRipple isActive={isRippling} position={ripplePosition || { x: 0, y: 0 }} />
      <Header />
      <Footer />
      <PageIndicator
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageClick={navigateToPage}
      />
      <ScrollIndicator currentPage={currentPage} />

      {/* Page Container */}
      <div
        className="relative w-full h-full transition-transform duration-800 ease-in-out"
        style={{
          transform: `translateY(-${(currentPage - 1) * 100}vh)`,
        }}
      >
        {pages.map((page) => (
          <div
            key={page.id}
            className="w-full h-screen"
          >
            {/* Only mount current + adjacent pages for performance */}
            {mountedPages.has(page.id) ? page.component : null}
          </div>
        ))}
      </div>
    </div>
  );
}

