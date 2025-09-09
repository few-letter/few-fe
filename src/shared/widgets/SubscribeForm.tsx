"use client";

import { Checkboxes, EmailInput } from "@/shared/components";
import { useState } from "react";
import { validateEmail } from "@/shared/utils/util";

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
  const isDisabled =
    form.email === "" ||
    !validateEmail(form.email) ||
    form.categoryCodes.length === 0;

  const handleEmailChange = (value: string) => {
    setForm({ ...form, email: value });
  };

  const handleCategoryCodesChange = (value: CodeType[]) => {
    setForm({ ...form, categoryCodes: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          className="bg-gray10 font-sub6 disabled:bg-gray4 disabled:text-gray7 w-full rounded-sm py-16 text-white transition-colors"
        >
          구독하기
        </button>
      </form>
    </>
  );
};
