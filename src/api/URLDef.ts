import type { SearchParams } from "../shared/types";

export class URLDef {
  private path: string;
  private searchParams: SearchParams;

  constructor(path: string, searchParams?: SearchParams) {
    this.path = path;
    this.searchParams = searchParams || "";
  }

  private getSearchParams(): string {
    if (!this.searchParams) return "";

    if (typeof this.searchParams === "string") {
      return this.searchParams.replace(/^\?/, "");
    }

    if (this.searchParams instanceof URLSearchParams) {
      return this.searchParams.toString();
    }

    if (Array.isArray(this.searchParams)) {
      const searchParams = new URLSearchParams();
      this.searchParams.forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== null && item !== undefined && item !== "") {
              searchParams.append(String(key), String(item));
            }
          });
        } else {
          if (value !== null && value !== undefined && value !== "") {
            searchParams.append(String(key), String(value));
          }
        }
      });
      return searchParams.toString();
    }

    if (typeof this.searchParams === "object" && this.searchParams !== null) {
      const searchParams = new URLSearchParams();
      Object.entries(this.searchParams).forEach(([key, value]) => {
        // null, undefined, 빈 문자열 값은 제외
        if (value !== null && value !== undefined && value !== "") {
          searchParams.append(String(key), String(value));
        }
      });
      return searchParams.toString();
    }

    return "";
  }

  public generateURL(host: string): URL {
    const cleanHost = host.replace(/\/$/, "");
    const cleanPath = this.path.startsWith("/") ? this.path : `/${this.path}`;
    const searchParams = this.getSearchParams();

    return new URL(
      `${cleanHost}${cleanPath}${searchParams ? `?${searchParams}` : ""}`,
    );
  }
}
