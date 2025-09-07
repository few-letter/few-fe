"use client";

import { Checkboxes, EmailInput, Toast } from "@/shared/components";
import { FormEvent, useState } from "react";

interface SubscribeFormProps {
  categories: { code: string | number; value: string }[];
}

interface FormState {
  message: string;
  error: boolean;
  fieldValues: {
    email: string;
    categoryCodes: string[];
  };
}

export const SubscribeForm = ({ categories }: SubscribeFormProps) => {
  const [form, setForm] = useState<FormState>({
    message: "",
    error: false,
    fieldValues: {
      email: "",
      categoryCodes: [],
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      form.fieldValues.email === "" ||
      form.fieldValues.categoryCodes.length === 0
    ) {
      setForm({
        ...form,
        message: "이메일 주소와 카테고리를 선택해 주세요.",
      });
      return;
    }

    //POST
    
  };

  const handleToastClose = () => {
    setForm({ ...form, message: "" });
  };

  return (
    <>
      <form className="mt-40 space-y-32" onSubmit={handleSubmit}>
        <EmailInput
          value={form.fieldValues.email}
          onEmailChange={(email) =>
            setForm({ ...form, fieldValues: { ...form.fieldValues, email } })
          }
          label="이메일"
          name="email"
          placeholder="뉴스레터를 받을 이메일 주소를 입력해 주세요."
          errorMessage="잘못된 이메일 주소예요."
        />
        <div className="flex flex-col gap-12">
          <Checkboxes
            value={form.fieldValues.categoryCodes}
            onSelectionChange={(categoryCodes) =>
              setForm({
                ...form,
                fieldValues: { ...form.fieldValues, categoryCodes },
              })
            }
            label="받고 싶은 뉴스 카테고리"
            name="categoryCodes"
            options={categories}
          />
        </div>
        <button
          type="submit"
          className="bg-blue2 font-sub6 hover:bg-blue3 w-full rounded-sm py-16 text-white transition-colors"
        >
          구독하기
        </button>
      </form>
      <Toast message={form.message} type="error" onClose={handleToastClose} />
    </>
  );
};
