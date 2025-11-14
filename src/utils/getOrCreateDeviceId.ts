const DEVICE_ID_KEY = `${import.meta.env.VITE_LOCALSTORAGE_BASE}device_id`;

export function getOrCreateDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}