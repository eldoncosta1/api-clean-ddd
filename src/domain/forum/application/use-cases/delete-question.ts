import { Result, ResultError } from '@/core/result'
import { IQuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resoure-not-found-error'

type DeleteQuestionUseCaseRequest = {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Result<
  null,
  ResourceNotFoundError | NotAllowedError
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return ResultError(ResourceNotFoundError('Question not found'))
    }

    if (authorId !== question.authorId.toString()) {
      return ResultError(NotAllowedError('Not allowed'))
    }

    await this.questionsRepository.delete(question)

    return {
      success: true,
      value: null,
    }
  }
}
