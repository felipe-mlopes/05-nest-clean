import { Module } from '@nestjs/common'

import { CacheModule } from '../cache/cache.module'
import { PrismaService } from './prisma/prisma.service'

import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository'
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository'

import { QuestionsRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from 'src/domain/forum/application/repositories/students-repository'
import { AnswerAttachmentsRepository } from 'src/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerCommentsRepository } from 'src/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from 'src/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from 'src/domain/forum/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from 'src/domain/forum/application/repositories/question-comments-repository'
import { AttachmentsRepository } from 'src/domain/forum/application/repositories/attachments-repository'
import { NotificationsRepository } from 'src/domain/notification/application/repositories/notifications-repository'

@Module({
  imports: [CacheModule],
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
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
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
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [
    PrismaService,
    StudentsRepository,
    QuestionsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
