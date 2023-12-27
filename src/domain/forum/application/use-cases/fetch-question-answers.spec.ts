import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswers } from 'test/factories/make-answers'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswers({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswers({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswers({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswers({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})