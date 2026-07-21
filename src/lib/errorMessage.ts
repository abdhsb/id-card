export function getErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof Error) return err.message;

  if (err && typeof err === 'object') {
    const withMessage = err as { message?: unknown; error_description?: unknown; details?: unknown };
    const message = withMessage.message ?? withMessage.error_description ?? withMessage.details;
    if (typeof message === 'string' && message.trim()) return message;
  }

  return fallback;
}
