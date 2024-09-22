"use client";

import { showToastError } from "@/app/_components/shared/showToast";
import { updateStripeUser } from "@/stripe/actions";
import { Tables } from "@/stripe/types";
import { ChangeEvent, useState } from "react";

export default function PromotionalEmailsCheckbox({
  stripeUserData,
}: {
  stripeUserData: Tables<"users"> | null;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(
    stripeUserData?.recieve_promotional_emails ?? true
  );

  const handleTogglePromotionalEmails = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(event.target.checked);
    if (!stripeUserData) return;
    const { error } = await updateStripeUser({
      id: stripeUserData.id,
      user_id: stripeUserData.user_id,
      recieve_promotional_emails: event.target.checked,
    });
    if (error) {
      showToastError(error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p>I would like to receive promotional emails from Taplo</p>
      <input
        type="checkbox"
        className="checkbox checkbox-primary checkbox-sm"
        checked={isChecked}
        onChange={(e) => handleTogglePromotionalEmails(e)}
      />
    </div>
  );
}
