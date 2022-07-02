export default function formatDate(date) {
  if (date === undefined) date = new Date();
  else date = new Date(date);
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
}
