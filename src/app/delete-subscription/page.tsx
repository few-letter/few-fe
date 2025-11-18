"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useState, Suspense } from "react";

import { Toast } from "@/shared/components";
import { deleteSubscriptionMutation } from "@/shared/remotes/deleteSubscription";
import {
  SUCCESS_UNSUBSCRIPTION_TOAST_MESSAGE,
  ERROR_UNSUBSCRIPTION_TOAST_MESSAGE,
} from "@/shared/constants/util";

import type { SuccessBodyDeleteSubscriptionResponse } from "@/shared/types";
import type { DeleteSubscriptionRequest } from "@/shared/remotes/deleteSubscription";

interface DeleteSubscriptionPageToast {
  success?: string | null;
  error?: string | null;
}

export default function DeleteSubscriptionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeleteSubscriptionContent />
    </Suspense>
  );
}

function DeleteSubscriptionContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [toast, setToast] = useState<DeleteSubscriptionPageToast>({
    success: null,
    error: null,
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const unsubscribeMutation = useMutation({
    ...deleteSubscriptionMutation(),
    onSuccess: () => {
      setToast({ success: SUCCESS_UNSUBSCRIPTION_TOAST_MESSAGE });
      setIsConfirmed(true);
    },
    onError: (error: Error) => {
      const errorMessage = error.message || ERROR_UNSUBSCRIPTION_TOAST_MESSAGE;
      setToast({ error: errorMessage });
    },
  });

  if (isConfirmed) {
    return (
      <>
        <SuccessPage />
        <Toast
          message={toast.success ?? null}
          type="success"
          duration={3000}
          onClose={() => setToast({ success: null })}
        />
      </>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-16">
      <div className="flex flex-col items-center gap-16">
        <Image src="/images/logo/few.png" alt="logo" width={64} height={32} />
        {email ? (
          <UnsubscribePage
            email={email}
            unsubscribeMutation={unsubscribeMutation}
          />
        ) : (
          <p className="font-body4 text-gray9">
            이메일 정보가 올바르지 않습니다.
          </p>
        )}
      </div>
      <Toast
        message={toast.error ?? null}
        type="error"
        duration={3000}
        onClose={() => setToast({ error: null })}
      />
    </section>
  );
}

interface UnsubscribePageProps {
  email: string;
  unsubscribeMutation: UseMutationResult<
    SuccessBodyDeleteSubscriptionResponse,
    unknown,
    DeleteSubscriptionRequest,
    unknown
  >;
}

const UnsubscribePage = ({
  email,
  unsubscribeMutation,
}: UnsubscribePageProps) => {
  const handleUnsubscribe = () => {
    unsubscribeMutation.mutate({ email });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <p className="font-body4 text-gray9">
          few. 레터를 <span className="font-sub5 text-red3">구독취소</span>
          하시겠습니까?
        </p>
        <p className="font-body6 text-gray7">{email}</p>
      </div>
      <button
        onClick={handleUnsubscribe}
        disabled={unsubscribeMutation.isPending}
        className="bg-gray10 font-body6 disabled:bg-gray4 disabled:text-gray7 hover:bg-gray9 mt-32 w-full rounded-sm px-88 py-12 text-white transition-colors"
      >
        {unsubscribeMutation.isPending ? "처리 중..." : "구독취소"}
      </button>
    </>
  );
};

const SuccessPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-16">
      <Image
        src="/images/Graphic.png"
        alt="few-graphic"
        width={203}
        height={164}
        className="w-full max-w-240"
      />
      <div>
        <p className="font-body3 text-gray9 text-center">
          few. 레터 구독을 취소했습니다.
        </p>
        <p className="font-body3 text-gray9 text-center">
          더 좋은 콘텐츠로 다시 만나요!
        </p>
        <button
          onClick={handleGoHome}
          className="bg-gray10 font-body6 disabled:bg-gray4 disabled:text-gray7 hover:bg-gray9 mt-32 w-full rounded-sm px-88 py-12 text-white transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </section>
  );
};
