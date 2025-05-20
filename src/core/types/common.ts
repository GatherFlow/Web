type Maybe<T> = T | undefined | null

interface ApiError {
  title: string
	type: string
	details: string
	status: number
	timestamp: string
}

export type { ApiError, Maybe }