import { Attachment as PrismaAnswerAttachment } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { AnswerAttachment } from 'src/domain/forum/enterprise/entities/answer-attachment'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAnswerAttachment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerAttachment.create(
      {
        answerId: new UniqueEntityID(raw.answerId),
        attachmentId: new UniqueEntityID(raw.id),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
