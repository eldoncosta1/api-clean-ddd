import { Result, ResultError } from '@/core/result'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resoure-not-found-error'
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

type DeleteAnswerCommentsUseCaseRequest = {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentsUseCaseResponse = Result<
  {},
  ResourceNotFoundError | NotAllowedError
>

export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentsUseCaseRequest): Promise<DeleteAnswerCommentsUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return ResultError(ResourceNotFoundError('Answer comment not found'))
    }

    if (answerComment.authorId.toString() !== authorId) {
      return ResultError(NotAllowedError('Not allowed'))
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {
      success: true,
      value: {},
    }
  }
}
