export const formatCurrency = (amount: number): string => {
  return `K ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatNumbers = (amount: number): string => {
  return `${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
export const unformatNumber = (formatted: string): number => {
  return parseFloat(formatted.replace(/,/g, ""));
};
export const unformatCurrency = (formatted: string): number => {
  if (!formatted) return 0;

  const numericString = formatted.replace(/[^0-9.]/g, "");
  const parsed = parseFloat(numericString);

  return isNaN(parsed) ? 0 : parsed;
};
