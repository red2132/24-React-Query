import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export async function fetchEvents({ signal, searchTerm }) {
  let url = 'http://localhost:3000/events'

  if (searchTerm) {
    url += '?search=' + searchTerm
  }

  const response = await fetch(url, { signal: signal })

  if (!response.ok) {
    const error = new Error('데이터 전송 중 문제가 발생했습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { events } = await response.json()

  return events
}


export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('저장 중에 문제가 발생했습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { event } = await response.json()

  return event
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`http://localhost:3000/events/images`, { signal })

  if (!response.ok) {
    const error = new Error('사진 업로드 중에 문제가 생겼습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { images } = await response.json()

  return images
}