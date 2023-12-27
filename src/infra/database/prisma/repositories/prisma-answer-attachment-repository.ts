import { Injectable } from '@nestjs/common'

import { AnswerAttachmentRepository } from 'src/domain/forum/application/repositories/answer-attachment-repository'
import { AnswerAttachment } from 'src/domain/forum/enterprise/entities/answer-attachment'

@Injectable()
export class PrismaAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerIn(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
