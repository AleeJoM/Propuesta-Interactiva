export const FINAL_QUESTION_MESSAGES: readonly string[] = [
  "JAJAJA, que CHISTOSA. Sabés que la respuesta correcta es la otra, no te hagas la tonti!",
  "¿Posta vas a elegir esa opción? Litoooooo!",
  "Dale mi chiquita... Sabés cuál es la respuesta que me querés dar!",
  "¡No seas malita!",
  "🥺🥺🥺🥺🥺🥺🥺",
  "Ya te diste cuenta del jueguito! Solo hay una opción posible...",
  "NO HAY ESCAPATORIA",
  "¿Querés que llore? Porque si seguís así voy a llorar... 😭"
] as const;

export const getRandomFinalMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * FINAL_QUESTION_MESSAGES.length);
  return FINAL_QUESTION_MESSAGES[randomIndex];
};

export const MESSAGES_CONFIG = {
  MAX_ATTEMPTS: 3,
  FALLBACK_MESSAGE: "Dale... ya sabés cuál es la respuesta correcta! 💕"
} as const;
