/**
 * @returns {Promise<Response>}
 */
export function getRepLogs() {
  return fetch('/reps')
    .then(response => response.json())
}
