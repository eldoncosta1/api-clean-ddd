import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/questions-repository'

type EditQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = {
  question: Question
}

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
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.content = content

    const questionEdited = await this.questionsRepository.save(question)

    return {
      question: questionEdited,
    }
  }
}
