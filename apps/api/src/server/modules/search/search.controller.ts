import { Get, Param, Body, Controller, Post } from '@nestjs/common'

import type { SearchQuery } from './search.entity'
import { SearchService } from './search.service'

@Controller('search')
export class SearchController {
  constructor (private readonly service: SearchService) {}

  @Post()
  async storeSearchQuery (@Body('query') query: string): Promise<void> {
    await this.service.storeSearchQuery(query)
  }

  @Get('history/:userId')
  async getSearchHistory (@Param('userId') userId: string): Promise<SearchQuery[]> {
    return this.service.getSearchHistory(userId)
  }

  @Get('suggestions/:query')
  async getSearchSuggestions (@Param('query') query: string): Promise<string[]> {
    return this.service.getSearchSuggestions(query)
  }
}
