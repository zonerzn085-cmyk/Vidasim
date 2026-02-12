
import React from 'react';

function LayoutBackground(): React.ReactElement {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-gray-950 pointer-events-none">
            {/* Base Color - Solid Black/Gray */}
            <div className="absolute inset-0 bg-gray-950"></div>

            {/* Animated Blob 1 - Game Blue (Teal) */}
            <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] sm:w-[600px] sm:h-[600px] bg-teal-900/20 rounded-full blur-[100px] animate-drift-slow opacity-60 mix-blend-screen"></div>

            {/* Animated Blob 2 - Darker Blue/Purple */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] sm:w-[600px] sm:h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-drift-reverse opacity-50 mix-blend-screen"></div>

            {/* Animated Blob 3 - Center Accent */}
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] sm:w-[400px] sm:h-[400px] bg-teal-600/5 rounded-full blur-[80px] animate-pulse opacity-30"></div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
            
            {/* Grid Line Overlay (Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
    );
}

export default React.memo(LayoutBackground);
