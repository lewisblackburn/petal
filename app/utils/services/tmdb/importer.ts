import { TMDB } from '../import.service'

export abstract class TMDBImporter<T> {
	protected tmdb: TMDB

	constructor(language: string = 'en-GB') {
		this.tmdb = new TMDB(language)
	}

	abstract import(entityId: string): Promise<T | false>
	abstract isExistingEntity(entityId: string): Promise<T | null>
	abstract saveEntity(data: T): Promise<T>
}
