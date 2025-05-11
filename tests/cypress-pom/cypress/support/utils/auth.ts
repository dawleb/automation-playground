export function getCredentials(): { email: string; password: string } {
  const email = Cypress.env('EMAIL');
  const password = Cypress.env('PASSWORD');

  if (!email || !password) {
    throw new Error('EMAIL and PASSWORD environment variables must be set');
  }

  return { email, password };
}
