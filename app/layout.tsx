import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "VPN - Freedom for Everyone",
  description: "Experience true online freedom with our VPN service. Fast, secure, and private.",
};

// Preconnect to Google Fonts for better performance
function FontPreconnect() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <FontPreconnect />
        {/* Static loading screen CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          #static-loading-screen {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: linear-gradient(to bottom right, rgb(127, 29, 29), rgb(17, 24, 39), rgb(0, 0, 0));
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: opacity 0.6s ease-out;
          }
          #static-loading-screen.hidden {
            opacity: 0;
            pointer-events: none;
          }
          #static-loading-logo {
            width: 128px;
            height: 128px;
            margin-bottom: 3rem;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.8));
          }
          #static-loading-text {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 2rem;
            animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          #static-loading-bar {
            width: 320px;
            height: 8px;
            background: rgb(31, 41, 55);
            border-radius: 9999px;
            overflow: hidden;
            position: relative;
          }
          #static-loading-progress {
            height: 100%;
            background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38));
            border-radius: 9999px;
            animation: loading-progress 2s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          @keyframes loading-progress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          @media (max-width: 768px) {
            #static-loading-logo { width: 96px; height: 96px; }
            #static-loading-text { font-size: 1.5rem; }
            #static-loading-bar { width: 256px; }
          }
        ` }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Static loading screen - shows immediately before React loads */}
        <div id="static-loading-screen">
          <img 
            id="static-loading-logo" 
            src="/logo.png" 
            alt="Bimarz VPN" 
            width="128" 
            height="128"
          />
          <div id="static-loading-text">Loading...</div>
          <div id="static-loading-bar">
            <div id="static-loading-progress"></div>
          </div>
        </div>

        <ThemeProvider>
          {children}
        </ThemeProvider>

        {/* Script to hide static loading screen after React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load', function() {
            // Give React a moment to hydrate
            setTimeout(function() {
              var loadingScreen = document.getElementById('static-loading-screen');
              if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after fade-out animation
                setTimeout(function() {
                  if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                  }
                }, 600);
              }
            }, 100);
          });
        ` }} />
      </body>
    </html>
  );
}

