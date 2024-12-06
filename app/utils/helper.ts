export function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetSign = timezoneOffset > 0 ? "-" : "+";
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${milliseconds}${timezoneOffsetSign}${timezoneOffsetHours}${timezoneOffsetMinutes}`;
}

export function countWords(str: string) {
  const wordsArray = str.split(/\s+/);
  const filteredArray = wordsArray.filter((word) => word.trim() !== "");
  return filteredArray.length;
}

export function fakeDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
