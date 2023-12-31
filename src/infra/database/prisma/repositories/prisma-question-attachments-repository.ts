import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { QuestionAttachmentsRepository } from 'src/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from 'src/domain/forum/enterprise/entities/question-attachment'
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    })

    return questionAttachments.map((questionAttachment) =>
      PrismaQuestionAttachmentMapper.toDomain(questionAttachment),
    )
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    // eslint-disable-next-line no-empty
    if (attachments.length === 0) {
      return
    }

    const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    // eslint-disable-next-line no-empty
    if (attachments.length === 0) {
      return
    }

    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentIds,
        },
      },
    })
  }

  async deleteManyByQuestionIn(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    })
  }
}
