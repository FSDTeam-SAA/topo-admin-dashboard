import React from "react";
import ContactInformation from "./_components/contact-information";
import BankInformation from "./_components/bank-information";
import PasswordSecurity from "./_components/password-security";
import NotificationPreference from "./_components/notification-preference";
import SettingsAction from "./_components/settings-action";

const page = () => {
  return (
    <div>
      <h1 className="text-2xl font-medium uppercase tracking-[0.3rem]">
        Account Settings{" "}
      </h1>

      <div className="mt-8 space-y-8">
        <ContactInformation />
        <BankInformation />
        <PasswordSecurity />
        <NotificationPreference />
        <SettingsAction />
      </div>
    </div>
  );
};

export default page;
