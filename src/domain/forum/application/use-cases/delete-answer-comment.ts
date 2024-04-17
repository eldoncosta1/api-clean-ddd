import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'

type DeleteAnswerCommentsUseCaseRequest = {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentsUseCaseRequest): Promise<void> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('AnswerComment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
