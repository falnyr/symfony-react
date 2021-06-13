/**
 * @returns {Promise<Response>}
 */
export function getRepLogs() {
  return fetch('/reps', {
    credentials: 'same-origin'
  })
    .then(response => response.json()
      .then(
        data => data.items
      )
    )
}
