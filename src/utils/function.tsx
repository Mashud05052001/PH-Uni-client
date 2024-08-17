export const generateUpperCaseWords = (
  str: string,
  isEveryWordsUpperCase: boolean = false
) => {
  let words: string;
  if (isEveryWordsUpperCase) {
    words = str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } else {
    words = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return words;
};

export const generateUpcomingTenYears = (count: number = 5) => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let i = 0; i < count; i++) {
    years.push((currentYear + i).toString());
  }
  return years;
};
