import { Module } from '@nestjs/common'

import { Encrypter } from 'src/domain/forum/application/cryptography/encrypter'
import { HashGenerator } from 'src/domain/forum/application/cryptography/hash-generator'
import { HashComparer } from 'src/domain/forum/application/cryptography/hash-comparer'

import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
