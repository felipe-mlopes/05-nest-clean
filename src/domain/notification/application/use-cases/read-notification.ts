import { Either, left, right } from 'src/core/either'
import { NotificationRepository } from '../repositories/notification-repository'
import { Notification } from '../../enterprise/entities/notification'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notficationRepository: NotificationRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notficationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.id.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notficationRepository.save(notification)

    return right({
      notification,
    })
  }
}
