import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('search_queries')
export class SearchQuery {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  queryText: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
