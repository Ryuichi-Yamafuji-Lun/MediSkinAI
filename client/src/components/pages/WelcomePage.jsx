import WelcomeSection from "../section/WelcomeSection";
import HowItWorksSection from "../section/HowItWorksSection";
import ScopeSection from "../section/ScopeSection";

const WelcomePage = () => {

  return (
    <div className="flex flex-col items-center">
      {/* Welcome Section */}
      <WelcomeSection />
      {/* How it Works Section */}
      <HowItWorksSection />
      {/* What it can and can't do */}
      <ScopeSection />
    </div>
  );
};

export default WelcomePage;
