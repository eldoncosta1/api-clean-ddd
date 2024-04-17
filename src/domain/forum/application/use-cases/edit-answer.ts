import { Result, ResultError } from '@/core/result'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resoure-not-found-error'

type EditAnswerUseCaseRequest = {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Result<
  {
    answer: Answer
  },
  ResourceNotFoundError | NotAllowedError
>

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return ResultError(ResourceNotFoundError('Answer not found'))
    }

    if (authorId !== answer.authorId.toString()) {
      return ResultError(NotAllowedError('Not allowed'))
    }

    answer.content = content

    const answerEdited = await this.answersRepository.save(answer)

    return {
      success: true,
      value: { answer: answerEdited },
    }
  }
}
