import { Injectable, Logger } from '@nestjs/common'
import { Pool } from 'pg'

@Injectable()
export class SearchService {
  private logger = new Logger(this.constructor.name)
  private pool: Pool

  constructor () {
    this.pool = new Pool({
      connectionString: 'postgres://username:password@localhost:5432/giphy_clone'
    })
  }

  async storeSearchQuery (queryText: string): Promise<void> {
    try {
      const insertQuery = 'INSERT INTO search_queries (query_text) VALUES ($1)'

      await this.pool.query(insertQuery, [queryText])
      this.logger.log(`Stored search query: ${queryText}`)
    } catch (error) {
      this.logger.error(`Error storing search query: ${error.message}`)
    }
  }
}
