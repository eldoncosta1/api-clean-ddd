import { IAnswersRepository } from '../repositories/answers-repository'

type DeleteAnswerUseCaseRequest = {
  answerId: string
  authorId: string
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answer)
  }
}
