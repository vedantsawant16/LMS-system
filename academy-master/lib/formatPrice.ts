export const formatPrice = (price: number | null) => {
  if (price === null) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0, // Remove decimal places
    maximumFractionDigits: 0, 
  }).format(price);
};
