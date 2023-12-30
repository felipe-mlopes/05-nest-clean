import { Comment as PrismaAnswerComment, Prisma } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaAnswerComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerComment.create(
      {
        answerId: new UniqueEntityID(raw.answerId),
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    answercomment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answercomment.id.toString(),
      authorId: answercomment.authorId.toString(),
      content: answercomment.content,
      createdAt: answercomment.createdAt,
      updatedAt: answercomment.updatedAt,
    }
  }
}
