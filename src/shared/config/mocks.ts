// Моки включаются переменной окружения VITE_USE_MOCKS=true (по умолчанию — в .env.development).
// В production-сборке флаг выключен, и моки вырезаются из бандла.
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";
