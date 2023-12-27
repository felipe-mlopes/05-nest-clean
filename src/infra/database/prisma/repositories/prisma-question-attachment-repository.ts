import { Injectable } from '@nestjs/common'
import { QuestionAttachmentRepository } from 'src/domain/forum/application/repositories/question-attachment-repository'
import { QuestionAttachment } from 'src/domain/forum/enterprise/entities/question-attachment'

@Injectable()
export class PrismaQuestionAttachmentRepository
  implements QuestionAttachmentRepository
{
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByQuestionIn(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
