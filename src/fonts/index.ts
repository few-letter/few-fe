import localFont from "next/font/local";
import { Numans } from "next/font/google";

const numans = Numans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-numans",
});

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export { pretendard, numans };
