import 'reflect-metadata';
import { Startup } from './src/startup';
import { DatabaseContext } from './src/02-persistance';
import { DbOptionBuilder, DbOptions } from './framework/database';
import { WebApiBuilder } from './framework/core';

const entitiesDirname: string = __dirname + '/src/03-core/domain/*.js';
const databaseOptions = new DbOptionBuilder();
const options: DbOptions = databaseOptions
    .useMySqlServer()
    .useDatabase('end')
    .useUsername('root')
    .usePassword('root')
    .useHost('localhost')
    .usePort(3306)
    .addEnitiesFolder(entitiesDirname)
    .build();

const core: WebApiBuilder = new WebApiBuilder();
core.useStartupClass(Startup)
    .useJwtAuthorization({
        signingKey: 'c1b05003-6218-488c-876f-ee819c7461ef'
    })
    .useDatabase(DatabaseContext, new DatabaseContext(options))
    .run();