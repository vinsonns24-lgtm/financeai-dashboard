import { Outlet, useLocation } from 'react-router-dom';
import { SideNav, TopBar } from './SideNav';
import { FloatingFab, BottomNav } from './BottomNav';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export function Layout() {
  const location = useLocation();

  return (
    <div className="text-on-surface antialiased min-h-screen flex flex-col md:flex-row overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      {/* Desktop Side Navigation */}
      <SideNav />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64 relative z-10 w-full h-screen overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Page Content with transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="flex-1 overflow-hidden"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating AI FAB */}
      <FloatingFab />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
