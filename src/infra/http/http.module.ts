import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-question-anwsers.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'

import { CreateQuestionUseCase } from 'src/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from 'src/domain/forum/application/use-cases/fetch-recent-questions'
import { RegisterStudentUseCase } from 'src/domain/forum/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from 'src/domain/forum/application/use-cases/authenticate-student'
import { GetQuestionBySlugUseCase } from 'src/domain/forum/application/use-cases/get-question-by-slug'
import { EditQuestionUseCase } from 'src/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionUseCase } from 'src/domain/forum/application/use-cases/delete-question'
import { AnswerQuestionUseCase } from 'src/domain/forum/application/use-cases/answer-question'
import { EditAnswerUseCase } from 'src/domain/forum/application/use-cases/edit-answer'
import { DeleteAnswerUseCase } from 'src/domain/forum/application/use-cases/delete-answer'
import { FetchQuestionAnswersUseCase } from 'src/domain/forum/application/use-cases/fetch-question-answers'
import { ChooseQuestionBestAnswerUseCase } from 'src/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnQuestionUseCase } from 'src/domain/forum/application/use-cases/comment-on-question'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
  ],
})
export class HttpModule {}
