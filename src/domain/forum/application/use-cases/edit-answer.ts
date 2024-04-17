import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/answers-repository'

type EditAnswerUseCaseRequest = {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    const answerEdited = await this.answersRepository.save(answer)

    return {
      answer: answerEdited,
    }
  }
}
