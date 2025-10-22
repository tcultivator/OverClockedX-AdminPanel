export function formatDateYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // months are zero‑based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}