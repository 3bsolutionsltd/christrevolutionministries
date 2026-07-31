// Simple in-memory session store for development
// Use global to ensure singleton behavior across module reloads
declare global {
  var __sessions: Map<string, { username: string; created: number }> | undefined;
}

const sessions = globalThis.__sessions ?? (globalThis.__sessions = new Map());

export function createSession(username: string): string {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  sessions.set(sessionId, { username, created: Date.now() });
  console.log('Session store - Created session:', sessionId);
  console.log('Session store - Total sessions after creation:', sessions.size);
  return sessionId;
}

export function validateSession(sessionId: string): boolean {
  console.log('Session store - Validating session:', sessionId);
  console.log('Session store - Total sessions:', sessions.size);
  console.log('Session store - All sessions:', Array.from(sessions.keys()));
  
  const session = sessions.get(sessionId);
  console.log('Session store - Found session:', !!session);
  
  if (!session) return false;
  
  // Session expires after 24 hours
  const expired = Date.now() - session.created > 24 * 60 * 60 * 1000;
  if (expired) {
    console.log('Session store - Session expired');
    sessions.delete(sessionId);
    return false;
  }
  
  console.log('Session store - Session valid');
  return true;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function getSessionUser(sessionId: string): string | null {
  const session = sessions.get(sessionId);
  return session ? session.username : null;
}