export const getPublicIdFromUrl = (url: string) => {
  const regex = /\/v\d+\/(.*?)(\.\w+)?$/; // 버전과 public ID를 추출하는 정규 표현식
  const match = url.match(regex);
  return match ? match[1] : null; // public ID 리턴
};
