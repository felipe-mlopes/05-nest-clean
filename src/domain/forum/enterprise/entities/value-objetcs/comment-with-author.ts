import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { ValeObject } from 'src/core/entities/vale-object'

export interface CommentWithAuthorProps {
  commentId: UniqueEntityID
  content: string
  authorId: UniqueEntityID
  author: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthor extends ValeObject<CommentWithAuthorProps> {
  get commentId() {
    return this.props.commentId
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor(props)
  }
}
