import { Result, ResultError } from '@/core/result'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resoure-not-found-error'

type EditQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Result<
  {
    question: Question
  },
  ResourceNotFoundError | NotAllowedError
>

export class EditQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return ResultError(ResourceNotFoundError('Question not found'))
    }

    if (authorId !== question.authorId.toString()) {
      return ResultError(NotAllowedError('Not allowed'))
    }

    question.title = title
    question.content = content

    const questionEdited = await this.questionsRepository.save(question)

    return {
      success: true,
      value: { question: questionEdited },
    }
  }
}
