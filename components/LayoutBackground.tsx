
import React from 'react';

function LayoutBackground(): React.ReactElement {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-gray-950 pointer-events-none">
            {/* Base Color */}
            <div className="absolute inset-0 bg-gray-950"></div>

            {/* Blob 1 - Teal - Removed mix-blend-screen for performance */}
            <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] sm:w-[600px] sm:h-[600px] bg-teal-900/20 rounded-full blur-[60px] opacity-50"></div>

            {/* Blob 2 - Blue - Removed mix-blend-screen for performance */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] sm:w-[600px] sm:h-[600px] bg-blue-900/10 rounded-full blur-[60px] opacity-40"></div>

            {/* Blob 3 - Center - Lightweight */}
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] sm:w-[400px] sm:h-[400px] bg-teal-600/5 rounded-full blur-[50px] opacity-30"></div>

            {/* Grid Line Overlay - Simple CSS */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
    );
}

export default React.memo(LayoutBackground);
