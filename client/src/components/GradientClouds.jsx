import { memo } from 'react';

const GradientClouds = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Cloud 1 - Left */}
      <div
        className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.15] blur-3xl animate-cloud-drift-1"
        style={{
          background: 'radial-gradient(circle, #6EE7FF 0%, transparent 60%)',
        }}
      />
      
      {/* Cloud 2 - Right */}
      <div
        className="absolute top-1/3 -right-32 w-[700px] h-[700px] rounded-full opacity-[0.18] blur-3xl animate-cloud-drift-2"
        style={{
          background: 'radial-gradient(circle, #C084FC 0%, transparent 60%)',
        }}
      />
      
      {/* Cloud 3 - Center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.22] blur-3xl animate-cloud-drift-3"
        style={{
          background: 'radial-gradient(circle, #F472B6 0%, transparent 60%)',
        }}
      />
      
      {/* Cloud 4 - Bottom Left */}
      <div
        className="absolute bottom-1/4 left-1/4 w-[650px] h-[650px] rounded-full opacity-[0.17] blur-3xl animate-cloud-drift-4"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default memo(GradientClouds);
