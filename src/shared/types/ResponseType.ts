/**
 * GET contents
 */

interface SuccessBodyBrowseContentResponses {
  data: BrowseContentsResponses;
  message: string;
}

interface BrowseContentsResponses {
  contents: BrowseContentsResponse[];
  isLast: boolean;
}

/**
 * GET contents/{id}
 */

interface SuccessBodyBrowseContentResponse {
  data: BrowseContentsResponse;
  message: string;
}

interface BrowseContentsResponse {
  id: number; //int64
  url: string;
  thumbnailImageUrl?: string;
  mediaType: CodeValueResponse;
  headline: string;
  summary: string;
  highlightTexts: string[];
  createdAt: Date;
  category: CodeValueResponse;
}

interface CodeValueResponse {
  code: number; //int32
  value: string;
}

/**
 * GET contents/groups
 */

interface SuccessBodyBrowseGroupGenResponses {
  data: BrowseGroupGenResponses;
  message: string;
}

interface BrowseGroupGenResponses {
  groups: BrowseGroupGenResponse[];
}

interface BrowseGroupGenResponse {
  id: number; //int64
  category: number; //int32
  selectedGroupIds: string;
  headline: string;
  summary: string;
  highlightTexts: string[];
  groupSourceHeadlines: GroupSourceHeadlineData[];
  createdAt: Date;
}

interface GroupSourceHeadlineData {
  headline: string;
  url: string;
}

/**
 * GET contents/categories
 */

interface SuccessBodyListCodeValueResponse {
  data: CodeValueResponse[];
  message: string;
}

interface Success {
  message: string;
}

export type {
  SuccessBodyBrowseContentResponses, //GET contents
  SuccessBodyBrowseContentResponse, //GET contents/{id}
  SuccessBodyBrowseGroupGenResponses, //GET contents/groups
  SuccessBodyListCodeValueResponse, //GET contents/categories
  Success, //POST contents/schedule, POST contents/groups/schedule
};
