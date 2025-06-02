type Maybe<T> = T | undefined | null

interface ApiError {
  title: string
	type: string
	details: string
	status: number
	timestamp: string
}

type GenericResponse<T> = {
  status: string
  description: Maybe<string>
  data: T
}

export type { ApiError, Maybe, GenericResponse }