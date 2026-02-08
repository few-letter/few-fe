"use client";

import { useCallback, useState } from "react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  postSubscriptionsMutation,
  getContentTypesOptions,
  getCategoriesOptions,
} from "@/shared/remotes";
import { Checkboxes, EmailInput, Toast, Tabs } from "@/shared/components";
import { validateEmail } from "@/shared/utils/util";
import {
  SUCCESS_SUBSCRIPTION_TOAST_MESSAGE,
  ERROR_SUBSCRIPTION_TOAST_MESSAGE,
} from "@/shared/constants/util";
import { useMixpanel } from "@/shared/providers";
import { MIXPANEL_EVENT, WORLD_TABS } from "@/shared/constants";
import { type CategoryCode, WorldType } from "@/shared/types";
import type { CodeType } from "@/shared/components/Checkboxes";

interface SubscribeFormState {
  email: string;
  categoryCodes: CodeType[];
  contentsType: number;
}

export const SubscribeForm = () => {
  const mixpanel = useMixpanel();
  const [activeTab, setActiveTab] = useState<WorldType>(WorldType.LOCAL);
  const { data: contentTypes } = useSuspenseQuery(getContentTypesOptions());
  const { data: localCategoriesResponse } = useSuspenseQuery(
    getCategoriesOptions(WorldType.LOCAL),
  );
  const { data: globalCategoriesResponse } = useSuspenseQuery(
    getCategoriesOptions(WorldType.GLOBAL),
  );
  const localCategories = localCategoriesResponse.data;
  const globalCategories = globalCategoriesResponse.data;
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
      <h1 className="font-heading4 text-gray10 pt-32 pb-8">
        few. 뉴스 구독하기
      </h1>
      <p className="font-body5 text-gray7">
        한줄로 떠먹여주는 AI 요약 뉴스레터, 보고싶은 카테고리만 모아 평일 아침
        9시에 받아보세요.
      </p>
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
