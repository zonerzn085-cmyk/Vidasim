import React from 'react';

interface ActionFeedbackToastProps {
  icon: React.ReactNode;
  text: string;
}

function ActionFeedbackToast({ icon, text }: ActionFeedbackToastProps): React.ReactElement {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-2xl font-bold z-[60] animate-fade-in-out shadow-lg flex items-center gap-4">
      <div className="w-8 h-8">{icon}</div>
      <span>{text}</span>
    </div>
  );
}

export default React.memo(ActionFeedbackToast);
