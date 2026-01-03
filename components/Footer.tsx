export default function Footer() {
  return (
    <footer className="py-6 px-4 md:px-8 relative bg-[#121212]">
      {/* Top border - Full width */}
      <div 
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          left: '0',
          right: '0',
          width: '100vw',
          marginLeft: 'calc((100% - 100vw) / 2)',
          marginRight: 'calc((100% - 100vw) / 2)',
          backgroundColor: 'rgba(255, 255, 255, 0.25)'
        }}
      ></div>
      <div className="max-w-[1500px] mx-auto text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
          © 2026 Brandon Campbell. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

