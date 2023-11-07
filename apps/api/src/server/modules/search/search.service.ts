import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SearchQuery } from './search.entity'

@Injectable()
export class SearchService {
  private logger = new Logger(this.constructor.name)

  constructor (
    @InjectRepository(SearchQuery)
    private readonly searchQueryRepository: Repository<SearchQuery>
  ) {}

  async storeSearchQuery (queryText: string): Promise<void> {
    try {
      const searchQuery = new SearchQuery()

      searchQuery.queryText = queryText

      await this.searchQueryRepository.save(searchQuery)
      this.logger.log(`Stored search query: ${queryText}`)
    } catch (error) {
      this.logger.error(`Error storing search query: ${error.message}`)
    }
  }

  async getSearchHistory (userId: string): Promise<SearchQuery[]> {
    try {
      const searchHistory = await this.searchQueryRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' }
      })

      return searchHistory
    } catch (error) {
      this.logger.error(`Error retrieving search history: ${error.message}`)

      throw new Error('Failed to retrieve search history')
    }
  }

  async getSearchSuggestions (query: string): Promise<string[]> {
    try {
      const suggestions = await this.searchQueryRepository
        .createQueryBuilder()
        .select('DISTINCT query_text')
        .where('query_text ILIKE :query', { query: `%${query}%` })
        .limit(10) // Adjust the limit as needed
        .getRawMany()

      return suggestions.map((item) => item.query_text)
    } catch (error) {
      this.logger.error(`Error generating search suggestions: ${error.message}`)

      throw new Error('Failed to generate search suggestions')
    }
  }
}
