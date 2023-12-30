import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachment-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachment-repository'
import { QuestionsRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from 'src/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { AnswerAttachmentRepository } from 'src/domain/forum/application/repositories/answer-attachment-repository'
import { AnswerCommentsRepository } from 'src/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from 'src/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentRepository } from 'src/domain/forum/application/repositories/question-attachment-repository'
import { QuestionCommentsRepository } from 'src/domain/forum/application/repositories/question-comments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestionAttachmentRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentRepository,
      useClass: PrismaAnswerAttachmentRepository,
    },
  ],
  exports: [
    PrismaService,
    StudentsRepository,
    QuestionsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentRepository,
  ],
})
export class DatabaseModule {}
