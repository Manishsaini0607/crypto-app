import DashboardLayout from "../../components/DashboardLayout";
import ContactCard from "./components/ContactCard";
import SupportCard from "./components/SupportCard";
import InfoCard from "../Dashboard/components/InfoCard";
import { IoMdMail } from "react-icons/io";
import { AiTwotoneMessage } from "react-icons/ai";

const Support = () => {
  return (
    <DashboardLayout>
      {/* vertical spacing between cards */}
      <div className="space-y-20">
        {/* “Contact Us” card */}
        <SupportCard
          icon={IoMdMail}
          leftComponent={<ContactCard />}
          title="Contact Us"
          text="Have a question or just want to know more? Feel free to reach out to us."
        />

        {/* “Live Chat” card */}
        <SupportCard
          icon={AiTwotoneMessage}
          leftComponent={
            <InfoCard
              inverted
              tagText="Contact"
              imgUrl="/grid_bg.svg"
              text="Learn more about our real estate, mortgage, and corporate account services"
            />
          }
          title="Live Chat"
          text="Don’t have time to wait for the answer? Chat with us now."
        />
      </div>
    </DashboardLayout>
  );
};

export default Support;
