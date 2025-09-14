import Image from "next/image";

export const Banner = () => {
  return (
    <div className="bg-banner hidden w-full justify-center md:flex">
      <Image src="/images/Banner.png" alt="banner" width={472} height={94} />
    </div>
  );
};
