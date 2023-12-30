import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { QuestionAttachmentRepository } from 'src/domain/forum/application/repositories/question-attachment-repository'
import { QuestionAttachment } from 'src/domain/forum/enterprise/entities/question-attachment'
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper'

@Injectable()
export class PrismaQuestionAttachmentRepository
  implements QuestionAttachmentRepository
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

  async deleteManyByQuestionIn(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    })
  }
}
