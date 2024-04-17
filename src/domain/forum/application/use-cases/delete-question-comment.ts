import { Result, ResultError } from '@/core/result'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resoure-not-found-error'

type DeleteQuestionCommentsUseCaseRequest = {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentsUseCaseResponse = Result<
  null,
  ResourceNotFoundError | NotAllowedError
>

export class DeleteQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentsUseCaseRequest): Promise<DeleteQuestionCommentsUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return ResultError(ResourceNotFoundError('QuestionComment not found'))
    }

    if (questionComment.authorId.toString() !== authorId) {
      return ResultError(NotAllowedError('Not allowed'))
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {
      success: true,
      value: null,
    }
  }
}
