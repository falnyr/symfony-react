function fetchJson(url, options) {
  return fetch(url, Object.assign({
    credentials: 'same-origin'
  }, options))
    .then(response => response.json())
}

/**
 * @returns {Promise<Response>}
 */
export function getRepLogs() {
  return fetchJson('/reps')
    .then(data => data.items)
}

/**
 * @returns {Promise<Response>}
 */
export function deleteRepLog(id) {
  return fetchJson(`/reps/${id}`, {
    method: 'DELETE'
  })
}
