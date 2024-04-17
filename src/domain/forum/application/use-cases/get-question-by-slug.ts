import { Result, ResultError } from '@/core/result'
import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resoure-not-found-error'

type GetQuestionBySlugUseCaseRequest = {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Result<
  {
    question: Question
  },
  ResourceNotFoundError
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return ResultError(ResourceNotFoundError('Question not found'))
    }

    return {
      success: true,
      value: { question },
    }
  }
}
