export function formatDate(value) {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
}
