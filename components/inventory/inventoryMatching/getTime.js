function getCurrentDateTime() {
  const now = new Date();

  const date = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are 0-based
  const year = now.getFullYear();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return `${date}-${month}-${year}, ${hours}:${minutes}`;
}

export default getCurrentDateTime;
