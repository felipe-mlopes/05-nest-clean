import { Module } from '@nestjs/common'
import { Updloader } from 'src/domain/forum/application/storage/uploader'
import { R2Storage } from './r2-storage'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Updloader,
      useClass: R2Storage,
    },
  ],
  exports: [Updloader],
})
export class StorageModule {}
