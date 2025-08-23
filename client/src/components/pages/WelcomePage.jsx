import WelcomeSection from "../section/WelcomeSection";
import AboutSection from "../section/AboutSection";
import HowItWorksSection from "../section/HowItWorksSection";

const WelcomePage = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      {/* Welcome Section */}
      <WelcomeSection />
      {/* Include About Section here */}
      <AboutSection />
      {/* How it Works Section */}
      <HowItWorksSection />
    </div>
  );
};

export default WelcomePage;