//example

export const apiRoutes = {
  problems: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/problems/:problemId`,
  submitAnswer: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/problems/:problemId`,
  workbook: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks/:workbookId`,
  workbooks: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks`,
  workbooksSubscription: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/subscriptions/workbooks`,
  article: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/articles/:articleId`,
  unsubscribe: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/subscriptions/all`,
  articleWithWorkbook: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks/:workbookId/articles/:articleId`,
  problemsWithArticle: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/problems`,
  members: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/members`,
  category: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks/categories`,
  token: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/members/token`,
  articleCategory: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/articles/categories`,
  logout: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/members`,
  workbookUnsubscription: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks/:workbookId/unsubs`,
  workbookSubscription: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks/:workbookId/subs`,
  workbookEmailTime: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/subscriptions/time`,
  workbookEmailDay: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/subscriptions/date`,
};
