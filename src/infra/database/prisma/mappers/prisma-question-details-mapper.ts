import {
  Question as PrismaQuestion,
  User as PrismaUser,
  Attachment as PrismaAttachment,
} from '@prisma/client'

import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { QuestionDetails } from 'src/domain/forum/enterprise/entities/value-objetcs/question-details'
import { Slug } from 'src/domain/forum/enterprise/entities/value-objetcs/slug'
import { PrismaAttachmentMapper } from './prisma-attachments-mapper'

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser
  attachments: PrismaAttachment[]
}

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
    return QuestionDetails.create({
      questionId: new UniqueEntityID(raw.id),
      authorId: new UniqueEntityID(raw.author.id),
      author: raw.author.name,
      title: raw.title,
      slug: Slug.create(raw.slug),
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityID(raw.bestAnswerId)
        : null,
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
