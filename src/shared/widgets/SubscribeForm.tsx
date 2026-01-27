"use client";

import { useCallback, useState } from "react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { postSubscriptionsMutation } from "@/shared/remotes";
import { getContentTypesOptions } from "@/shared/remotes";
import { Checkboxes, EmailInput, Toast, Tabs } from "@/shared/components";
import { validateEmail } from "@/shared/utils/util";
import {
  SUCCESS_SUBSCRIPTION_TOAST_MESSAGE,
  ERROR_SUBSCRIPTION_TOAST_MESSAGE,
} from "@/shared/constants/util";
import { useMixpanel } from "@/shared/providers";
import { MIXPANEL_EVENT, WORLD_TABS } from "@/shared/constants";
import { WorldType } from "@/shared/types";
import type { CategoryCode, CodeValueResponse } from "@/shared/types";
import type { CodeType } from "@/shared/components/Checkboxes";

interface SubscribeFormProps {
  localCategories: CodeValueResponse[];
  globalCategories: CodeValueResponse[];
}

interface SubscribeFormState {
  email: string;
  categoryCodes: CodeType[];
  contentsType: number;
}

export const SubscribeForm = ({
  localCategories,
  globalCategories,
}: SubscribeFormProps) => {
  const mixpanel = useMixpanel();
  const [activeTab, setActiveTab] = useState<WorldType>(
    WorldType.LOCAL,
  );
  const { data: contentTypes } = useSuspenseQuery(getContentTypesOptions());
  const getContentTypeCode = useCallback(
    (type: WorldType) =>
      contentTypes.find((item) => item.value === type)?.code ?? 0,
    [contentTypes],
  );

  const [form, setForm] = useState<SubscribeFormState>({
    contentsType: getContentTypeCode(WorldType.LOCAL),
    email: "",
    categoryCodes: [],
  });

  const currentCategories =
    activeTab === WorldType.LOCAL ? localCategories : globalCategories;
  const [successToastMessage, setSuccessToastMessage] = useState<string | null>(
    null,
  );
  const [errorToastMessage, setErrorToastMessage] = useState<string | null>(
    null,
  );
  const initializeForm = () =>
    setForm({
      contentsType: getContentTypeCode(activeTab),
      email: "",
      categoryCodes: [],
    });
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

  const handleTabChange = (value: WorldType) => {
    setActiveTab(value);
    setForm((prev) => ({
      ...prev,
      contentsType: getContentTypeCode(value),
      categoryCodes: [],
    }));
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
        <Tabs
          tabs={WORLD_TABS}
          value={activeTab}
          onChange={handleTabChange}
          className="border-none"
        />
        <div className="flex flex-col gap-12">
          <Checkboxes
            value={form.categoryCodes}
            onChange={handleCategoryCodesChange}
            onCheck={(code, checkedStatus) => {
              mixpanel?.track(MIXPANEL_EVENT.SUBSCRIBE_CATEGORY_CHECK, {
                category_id: code,
                is_checked: checkedStatus,
              });
            }}
            label="받고 싶은 뉴스 카테고리"
            name="categoryCodes"
            options={currentCategories}
          />
        </div>
        <button
          onClick={() => {
            mixpanel?.track(MIXPANEL_EVENT.SUBSCRIBE_SUBMIT_BUTTON_CLICK, {
              email: form.email,
              category_ids: form.categoryCodes,
            });
          }}
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
