import BackgroundContainer from './components/layout/BackgroundContainer';
import GrainOverlay from './components/layout/GrainOverlay';
import Sidebar from './components/layout/Sidebar';
import DashboardGrid from './components/dashboard/DashboardGrid';

function App() {
  return (
    <BackgroundContainer>
      <GrainOverlay />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <DashboardGrid />
        </main>
      </div>
    </BackgroundContainer>
  );
}

export default App;