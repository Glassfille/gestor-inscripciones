import './globals.css';

export const metadata = {
  title: 'Gestion de Cursos ISIL',
  description: 'Modulo publico de la oferta academica'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
