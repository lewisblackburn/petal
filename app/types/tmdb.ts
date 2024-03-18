export interface TMDBFilm {
	adult: boolean
	backdrop_path: string
	belongs_to_collection: any
	budget: number
	genres: TMDBGenre[]
	homepage: string
	id: number
	imdb_id: string
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: TMDBProductionCompany[]
	production_countries: TMDBProductionCountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: TMDBSpokenLanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
	credits: TMDBCredits
	keywords: {
		keywords: TMDBKeyword[]
	}
}

export interface TMDBGenre {
	id: number
	name: string
}

export interface TMDBProductionCompany {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

export interface TMDBProductionCountry {
	iso_3166_1: string
	name: string
}

export interface TMDBSpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

export interface TMDBCredits {
	cast: TMDBCastMember[]
	crew: TMDBCrewMember[]
}

export interface TMDBCastMember {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path?: string
	cast_id: number
	character: string
	credit_id: string
	order: number
}

export interface TMDBCrewMember {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path?: string
	credit_id: string
	department: string
	job: string
}

export interface TMDBKeyword {
	id: number
	name: string
}

export interface TMDBPerson {
	adult: boolean
	also_known_as: string[]
	biography: string
	birthday: string
	deathday: any
	gender: number
	homepage: any
	id: number
	imdb_id: string
	known_for_department: string
	name: string
	place_of_birth: string
	popularity: number
	profile_path: string
}

export interface TMDBSearchResult<T> {
	page: number
	results: T[]
	total_pages: number
	total_results: number
}

export type TMDBExtendedMember = TMDBCastMember | TMDBCrewMember
