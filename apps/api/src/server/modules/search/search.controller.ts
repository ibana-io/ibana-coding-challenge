import { Body, Controller, Post } from '@nestjs/common'

import { SearchService } from './search.service'

@Controller('search')
export class SearchController {
  constructor (private readonly service: SearchService) {}

  @Post()
  async storeSearchQuery (@Body('query') query: string): Promise<void> {
    await this.service.storeSearchQuery(query)
  }
}
