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
            overflow: hidden;
          }
          #static-loading-screen.hidden {
            opacity: 0;
            pointer-events: none;
          }
          
          /* Huge pulsing glow behind everything */
          #static-loading-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(239, 68, 68, 0.3) 30%, transparent 70%);
            filter: blur(60px);
            animation: glow-pulse 1s ease-in-out infinite;
            z-index: 1;
          }
          
          /* Logo wrapper for positioning ripples */
          #static-loading-logo-wrapper {
            position: relative;
            width: 128px;
            height: 128px;
            margin-bottom: 3rem;
            z-index: 2;
          }
          
          /* Ripple effects behind logo */
          .loading-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 128px;
            height: 128px;
            border: 3px solid rgba(239, 68, 68, 0.8);
            border-radius: 50%;
            animation: ripple-expand 2s ease-out infinite;
            z-index: 1;
          }
          .loading-ripple:nth-child(2) { animation-delay: 0.5s; }
          .loading-ripple:nth-child(3) { animation-delay: 1s; }
          .loading-ripple:nth-child(4) { animation-delay: 1.5s; }
          
          /* Logo with aggressive glitch */
          #static-loading-logo {
            position: relative;
            width: 128px;
            height: 128px;
            animation: aggressive-glitch 0.3s infinite, logo-glow 0.5s ease-in-out infinite;
            filter: drop-shadow(0 0 30px rgba(239, 68, 68, 1));
            z-index: 2;
          }
          
          #static-loading-text {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 2rem;
            animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            z-index: 2;
            position: relative;
          }
          
          #static-loading-bar {
            width: 320px;
            height: 8px;
            background: rgb(31, 41, 55);
            border-radius: 9999px;
            overflow: hidden;
            position: relative;
            z-index: 2;
          }
          
          #static-loading-progress {
            height: 100%;
            background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38));
            border-radius: 9999px;
            animation: loading-progress 2.5s ease-out forwards;
          }
          
          /* Animations */
          @keyframes glow-pulse {
            0%, 100% { 
              opacity: 0.6;
              transform: translate(-50%, -50%) scale(1);
            }
            50% { 
              opacity: 0.9;
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
          
          @keyframes ripple-expand {
            0% {
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0.8;
              border-width: 4px;
            }
            100% {
              transform: translate(-50%, -50%) scale(3);
              opacity: 0;
              border-width: 1px;
            }
          }
          
          @keyframes aggressive-glitch {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; filter: hue-rotate(0deg) brightness(1) drop-shadow(0 0 30px rgba(239, 68, 68, 1)); }
            5% { transform: translate(-3px, 2px) rotate(-2deg); opacity: 0.9; filter: hue-rotate(10deg) brightness(1.2) drop-shadow(0 0 35px rgba(239, 68, 68, 1)); }
            10% { transform: translate(2px, -3px) rotate(1deg); opacity: 0.7; filter: hue-rotate(-10deg) brightness(0.8) blur(1px) drop-shadow(0 0 25px rgba(239, 68, 68, 1)); }
            15% { transform: translate(-2px, -2px) rotate(-1deg); opacity: 1; filter: hue-rotate(15deg) brightness(1.3) drop-shadow(0 0 40px rgba(239, 68, 68, 1)); }
            20% { transform: translate(3px, 1px) rotate(2deg); opacity: 0.6; filter: hue-rotate(-15deg) brightness(0.7) blur(2px) drop-shadow(0 0 20px rgba(239, 68, 68, 1)); }
            25% { transform: translate(-1px, 3px) rotate(-2deg); opacity: 1; filter: hue-rotate(20deg) brightness(1.4) drop-shadow(0 0 45px rgba(239, 68, 68, 1)); }
            30% { transform: translate(2px, -2px) rotate(1deg); opacity: 0.8; filter: hue-rotate(-20deg) brightness(0.9) blur(1px) drop-shadow(0 0 30px rgba(239, 68, 68, 1)); }
            35% { transform: translate(-3px, -1px) rotate(-1deg); opacity: 1; filter: hue-rotate(25deg) brightness(1.5) drop-shadow(0 0 50px rgba(239, 68, 68, 1)); }
            40% { transform: translate(1px, 2px) rotate(2deg); opacity: 0.5; filter: hue-rotate(-25deg) brightness(0.6) blur(3px) drop-shadow(0 0 15px rgba(239, 68, 68, 1)); }
            45% { transform: translate(-2px, -3px) rotate(-2deg); opacity: 1; filter: hue-rotate(30deg) brightness(1.6) drop-shadow(0 0 55px rgba(239, 68, 68, 1)); }
            50% { transform: translate(3px, 1px) rotate(1deg); opacity: 0.9; filter: hue-rotate(0deg) brightness(1.1) drop-shadow(0 0 35px rgba(239, 68, 68, 1)); }
            55% { transform: translate(-1px, -2px) rotate(-1deg); opacity: 0.7; filter: hue-rotate(-30deg) brightness(0.8) blur(2px) drop-shadow(0 0 25px rgba(239, 68, 68, 1)); }
            60% { transform: translate(2px, 3px) rotate(2deg); opacity: 1; filter: hue-rotate(35deg) brightness(1.7) drop-shadow(0 0 60px rgba(239, 68, 68, 1)); }
            65% { transform: translate(-3px, -1px) rotate(-2deg); opacity: 0.6; filter: hue-rotate(-35deg) brightness(0.7) blur(3px) drop-shadow(0 0 20px rgba(239, 68, 68, 1)); }
            70% { transform: translate(1px, -3px) rotate(1deg); opacity: 1; filter: hue-rotate(40deg) brightness(1.8) drop-shadow(0 0 65px rgba(239, 68, 68, 1)); }
            75% { transform: translate(-2px, 2px) rotate(-1deg); opacity: 0.8; filter: hue-rotate(-40deg) brightness(0.9) blur(1px) drop-shadow(0 0 30px rgba(239, 68, 68, 1)); }
            80% { transform: translate(3px, -2px) rotate(2deg); opacity: 1; filter: hue-rotate(45deg) brightness(1.9) drop-shadow(0 0 70px rgba(239, 68, 68, 1)); }
            85% { transform: translate(-1px, 1px) rotate(-2deg); opacity: 0.5; filter: hue-rotate(-45deg) brightness(0.6) blur(3px) drop-shadow(0 0 15px rgba(239, 68, 68, 1)); }
            90% { transform: translate(2px, -1px) rotate(1deg); opacity: 1; filter: hue-rotate(50deg) brightness(2) drop-shadow(0 0 75px rgba(239, 68, 68, 1)); }
            95% { transform: translate(-3px, 3px) rotate(-1deg); opacity: 0.9; filter: hue-rotate(-50deg) brightness(1.1) blur(1px) drop-shadow(0 0 35px rgba(239, 68, 68, 1)); }
            100% { transform: translate(0, 0) rotate(0deg); opacity: 1; filter: hue-rotate(0deg) brightness(1) drop-shadow(0 0 30px rgba(239, 68, 68, 1)); }
          }
          
          @keyframes logo-glow {
            0%, 100% {
              filter: drop-shadow(0 0 30px rgba(239, 68, 68, 1)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.8));
            }
            50% {
              filter: drop-shadow(0 0 50px rgba(239, 68, 68, 1)) drop-shadow(0 0 100px rgba(239, 68, 68, 1));
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes loading-progress {
            0% { width: 0%; }
            30% { width: 40%; }
            60% { width: 75%; }
            100% { width: 100%; }
          }
          
          @media (max-width: 768px) {
            #static-loading-logo-wrapper { width: 96px; height: 96px; }
            #static-loading-logo { width: 96px; height: 96px; }
            .loading-ripple { width: 96px; height: 96px; }
            #static-loading-text { font-size: 1.5rem; }
            #static-loading-bar { width: 256px; }
            #static-loading-glow { width: 400px; height: 400px; }
          }
        ` }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Static loading screen - shows immediately before React loads */}
        <div id="static-loading-screen" suppressHydrationWarning>
          {/* Huge background glow */}
          <div id="static-loading-glow"></div>
          
          {/* Logo with ripple effects */}
          <div id="static-loading-logo-wrapper">
            {/* Ripple circles behind logo */}
            <div className="loading-ripple"></div>
            <div className="loading-ripple"></div>
            <div className="loading-ripple"></div>
            <div className="loading-ripple"></div>
            
            {/* Logo with aggressive glitch */}
            <img 
              id="static-loading-logo" 
              src="/logo.png" 
              alt="Bimarz VPN" 
              width="128" 
              height="128"
            />
          </div>
          
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

