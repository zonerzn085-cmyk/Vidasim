import React from 'react';

interface StatPillProps {
    icon: React.ReactNode;
    label: string;
    value: number;
}

function StatPill({ icon, label, value }: StatPillProps): React.ReactElement {
    return (
        <div className="flex flex-col items-center justify-center p-1 bg-gray-700/50 rounded-lg text-center" title={`${label}: ${value}`}>
            <div className="w-6 h-6 mb-0.5">
                {icon}
            </div>
            <span className="text-xs font-bold text-white leading-tight">{value}</span>
            <span className="text-[10px] text-gray-400 leading-tight hidden sm:block">{label}</span>
        </div>
    );
}

export default React.memo(StatPill);