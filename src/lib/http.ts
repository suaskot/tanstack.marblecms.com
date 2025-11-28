import { json } from '@tanstack/react-start'

const getEnv = () => {
  const apiUrl = process.env.MARBLE_API_URL
  const workspaceKey = process.env.MARBLE_WORKSPACE_KEY

  if (!apiUrl) {
    throw new Error('MARBLE_API_URL is not configured')
  }

  if (!workspaceKey) {
    throw new Error('MARBLE_WORKSPACE_KEY is not configured')
  }

  const base = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`
  return { base, workspaceKey }
}

export const buildUrl = (path: string) => {
  const { base, workspaceKey } = getEnv()
  return new URL(`${workspaceKey}/${path}`, base).toString()
}

export async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = buildUrl(path)
  const res = await fetch(url, init)

  if (!res.ok) {
    const ct = res.headers.get('content-type')?.toLowerCase() || ''
    let payload: unknown

    if (ct.includes('application/json')) {
      try {
        payload = await res.json()
      } catch {
        try {
          const text = await res.text()
          payload = text ? { message: text } : { message: res.statusText || 'Request failed' }
        } catch {
          payload = { message: res.statusText || 'Request failed' }
        }
      }
    } else {
      try {
        const text = await res.text()
        payload = text ? { message: text } : { message: res.statusText || 'Request failed' }
      } catch {
        payload = { message: res.statusText || 'Request failed' }
      }
    }

    throw json(payload, { status: res.status })
  }

  return await res.json()
}
