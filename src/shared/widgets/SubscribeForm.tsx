"use client";

import { Checkboxes, EmailInput, Toast } from "@/shared/components";
import { useState } from "react";
import { validateEmail } from "@/shared/utils/util";
import { useMutation } from "@tanstack/react-query";
import { postSubscriptionsMutation } from "@/shared/remotes/postSubscriptions";
import {
  SUCCESS_SUBSCRIPTION_TOAST_MESSAGE,
  ERROR_SUBSCRIPTION_TOAST_MESSAGE,
} from "@/shared/constants/util";

import type { CategoryCode } from "@/shared/types";
import type { CodeType } from "@/shared/components/Checkboxes";

interface SubscribeFormProps {
  categories: { code: CategoryCode; value: string }[];
}

interface SubscribeFormState {
  email: string;
  categoryCodes: CodeType[];
}

export const SubscribeForm = ({ categories }: SubscribeFormProps) => {
  const [form, setForm] = useState<SubscribeFormState>({
    email: "",
    categoryCodes: [],
  });
  const [successToastMessage, setSuccessToastMessage] = useState<string | null>(
    null,
  );
  const [errorToastMessage, setErrorToastMessage] = useState<string | null>(
    null,
  );
  const initializeForm = () => setForm({ email: "", categoryCodes: [] });
  const subscriptionMutation = useMutation({
    ...postSubscriptionsMutation(),
    onSuccess: () => {
      initializeForm();
      setSuccessToastMessage(SUCCESS_SUBSCRIPTION_TOAST_MESSAGE);
    },
    onError: () => {
      setErrorToastMessage(ERROR_SUBSCRIPTION_TOAST_MESSAGE);
    },
  });

  const isDisabled =
    form.email === "" ||
    !validateEmail(form.email) ||
    form.categoryCodes.length === 0 ||
    subscriptionMutation.isPending;

  const handleEmailChange = (value: string) => {
    setForm({ ...form, email: value.trim() });
  };

  const handleCategoryCodesChange = (value: CodeType[]) => {
    setForm({ ...form, categoryCodes: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    subscriptionMutation.mutate({
      email: form.email,
      categoryCodes: form.categoryCodes as CategoryCode[],
    });
  };

  return (
    <>
      <form className="mt-40 space-y-32" onSubmit={handleSubmit}>
        <EmailInput
          value={form.email}
          onChange={handleEmailChange}
          label="이메일"
          name="email"
          placeholder="뉴스레터를 받을 이메일 주소를 입력해 주세요."
          errorMessage="잘못된 이메일 주소예요."
        />
        <div className="flex flex-col gap-12">
          <Checkboxes
            value={form.categoryCodes}
            onChange={handleCategoryCodesChange}
            label="받고 싶은 뉴스 카테고리"
            name="categoryCodes"
            options={categories}
          />
        </div>
        <button
          disabled={isDisabled}
          type="submit"
          className="bg-gray10 font-body6 disabled:bg-gray4 disabled:text-gray7 w-full rounded-sm py-16 text-white transition-colors"
        >
          {subscriptionMutation.isPending ? "구독 중..." : "구독하기"}
        </button>
      </form>
      <Toast
        message={successToastMessage}
        type="success"
        duration={3000}
        onClose={() => setSuccessToastMessage(null)}
      />
      <Toast
        message={errorToastMessage}
        type="error"
        duration={3000}
        onClose={() => setErrorToastMessage(null)}
      />
    </>
  );
};
