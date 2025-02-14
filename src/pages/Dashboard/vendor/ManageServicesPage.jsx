import ActiveServices from "./components/ManageServiceSections/ActiveServicesList";
import ServiceRequestForm from "./components/ManageServiceSections/RequestNewService";
import ServiceRequestStatus from "./components/ManageServiceSections/ServiceRequestStatus";

const ManageServicesPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-10 px-0 transition-colors duration-300">
      <div className="max-w-[95%] sm:max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Page Title */}
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
          Manage Your Services
        </h2>

        {/* Section 1: Active Services */}
        <section className="space-y-6">
          <ActiveServices />
        </section>

        {/* Section 2: Request a New Service */}
        <section className="space-y-6">
          <h3 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white  text-center sm:text-left">
            Request a New Service
          </h3>
          <ServiceRequestForm />
        </section>

        {/* Section 3: Service Request Status */}
        <section className="space-y-6">
          <ServiceRequestStatus />
        </section>
      </div>
    </div>
  );
};

export default ManageServicesPage;
