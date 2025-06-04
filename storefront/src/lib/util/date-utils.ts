export const formatDate = (dateString: string, style: "short" | "long" = "short") => {
  const date = new Date(dateString);
  
  if (style === "short") {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};