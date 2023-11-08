import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { SearchQuery } from './search.entity'
import { SearchService } from './search.service'

describe('SearchService', () => {
  let searchService: SearchService
  let searchQueryRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getRepositoryToken(SearchQuery),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            createQueryBuilder: jest.fn()
          }
        }
      ]
    }).compile()

    searchService = module.get<SearchService>(SearchService)
    searchQueryRepository = module.get(getRepositoryToken(SearchQuery))
  })

  it('should be defined', () => {
    expect(searchService).toBeDefined()
  })

  it('should store a search query', async () => {
    const queryText = 'test query'
    const saveSpy = jest.spyOn(searchQueryRepository, 'save')

    await searchService.storeSearchQuery(queryText)

    expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining({ queryText }))
  })

  it('should get search history', async () => {
    const userId = 'testUserId'
    const mockSearchHistory = [{ /* your mock data */ }]
    const findSpy = jest.spyOn(searchQueryRepository, 'find').mockResolvedValue(mockSearchHistory)

    const result = await searchService.getSearchHistory(userId)

    expect(result).toEqual(mockSearchHistory)
    expect(findSpy).toHaveBeenCalledWith({ where: { userId }, order: { createdAt: 'DESC' } })
  })

  it('should get search suggestions', async () => {
    const query = 'testQuery'
    const mockSuggestions = [{ query_text: 'suggestion1' }, { query_text: 'suggestion2' }]
    const createQueryBuilderSpy = jest.spyOn(searchQueryRepository, 'createQueryBuilder')

    createQueryBuilderSpy.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockSuggestions)
    })

    const result = await searchService.getSearchSuggestions(query)

    expect(result).toEqual(['suggestion1', 'suggestion2'])
    expect(createQueryBuilderSpy).toHaveBeenCalledWith('searchQuery')
  })
})
