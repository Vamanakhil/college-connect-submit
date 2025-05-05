
import { CoachForm } from "@/components/CoachForm";
// import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <CoachForm />
        {/* Footer temporarily commented out
        <Footer />
        */}
      </div>
    </div>
  );
};

export default Index;
