export function YearMothDayTimeGenerator() {
  const nowPH = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );

  const year = nowPH.getFullYear();
  const month = String(nowPH.getMonth() + 1).padStart(2, "0");
  const day = String(nowPH.getDate()).padStart(2, "0");

  const hours = String(nowPH.getHours()).padStart(2, "0");
  const minutes = String(nowPH.getMinutes()).padStart(2, "0");
  const seconds = String(nowPH.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}