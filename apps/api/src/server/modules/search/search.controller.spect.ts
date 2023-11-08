import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'

import { SearchController } from './search.controller'
import { SearchService } from './search.service'

describe('SearchController', () => {
  let searchController: SearchController
  let searchService: SearchService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService]
    }).compile()

    searchController = module.get<SearchController>(SearchController)
    searchService = module.get<SearchService>(SearchService)
  })

  it('should be defined', () => {
    expect(searchController).toBeDefined()
  })

  it('should store a search query', async () => {
    const query = 'your-search-query'

    const mockStoreSearchQuery = jest.fn()

    jest.spyOn(searchService, 'storeSearchQuery').mockImplementation(mockStoreSearchQuery)

    await searchController.storeSearchQuery({ query })
    expect(mockStoreSearchQuery).toHaveBeenCalledWith(query)
  })

  it('should get search history', async () => {
    const userId = 'testUserId'
    const mockSearchHistory = [{ /* your mock data */ }]

    jest.spyOn(searchService, 'getSearchHistory').mockResolvedValue(mockSearchHistory)

    const result = await searchController.getSearchHistory(userId)

    expect(result).toEqual(mockSearchHistory)
  })

  it('should get search suggestions', async () => {
    const query = 'testQuery'
    const mockSearchSuggestions = ['suggestion1', 'suggestion2']

    jest.spyOn(searchService, 'getSearchSuggestions').mockResolvedValue(mockSearchSuggestions)

    const result = await searchController.getSearchSuggestions(query)

    expect(result).toEqual(mockSearchSuggestions)
  })
})
