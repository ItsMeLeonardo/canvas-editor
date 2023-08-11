export function generateId() {
  try {
    return window.crypto.randomUUID();
  } catch (error) {
    return Math.random().toString(36).substring(2, 9);
  }
}
