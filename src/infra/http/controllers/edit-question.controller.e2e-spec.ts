import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'

import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { AppModule } from 'src/infra/app.module'

import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from 'src/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-questions'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachment'

describe('Edit Question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment1.id,
      questionId: question.id,
    })

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment2.id,
      questionId: question.id,
    })

    const attachment3 = await attachmentFactory.makePrismaAttachment()

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New title',
        content: 'New content',
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      })

    expect(response.statusCode).toBe(204)

    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: 'New title',
        content: 'New content',
      },
    })

    expect(questionOnDatabase).toBeTruthy()

    const attachmentsOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: questionOnDatabase?.id,
      },
    })

    expect(attachmentsOnDatabase).toHaveLength(2)
    expect(attachmentsOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: attachment1.id.toString(),
        }),
        expect.objectContaining({
          id: attachment3.id.toString(),
        }),
      ]),
    )
  })
})
