import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export interface IQuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
