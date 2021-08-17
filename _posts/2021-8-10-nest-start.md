---
layout:     post
title:    Nest start & MySQL 5分钟开始一个项目
tags:
    - Nest
---

在这个教程里你将学到执行一个Nestjs程序有多简单，如下是使用的版本工具：

- Nestjs（Modules，Controllers，Repositories，TypeORM和Entities）
- **Node.js & NPM:** (https://nodejs.org/en/download/)
- **Mysql2:** (https://www.npmjs.com/package/mysql2)
- **Vscode:** (https://code.visualstudio.com/download)



**为什么是Nest.js？**

[Why Nest js？[github issue\]](https://github.com/nestjs/nest/issues/693)

简单说Nest可以很好的支持Typescript，可扩展的Node.js服务器端应用程序框架。提供了一个开箱即用的应用程序架构，允许开发人员和团队创建高度可测试，可扩展，松散耦合且易于维护的应用程序。

## 安装和创建Nestjs项目

```
npm install -g typescript
npm install -g @nestjs/cli
```

安装好之后，接下来开始创建项目。

```
nest new my-nest-project
cd my-nest-project
```

在vscode中打开‘my-nest-project’，可以看到生成的项目目录

```
node_modules: 安装包模块
src: 项目文件在这里
test: 单元测试test
nest-cli.json: 在Netsjs工作区的根目录下，为 Nestjs 提供的构建和开发工具，提供工作区范围和项目特定的配置默认值。配置中给出的路径值相对于根工作区文件夹。
packge.json: 安装依赖在这里查看
```

## Module, Service和Controller是什么意思：

### Module —— 架构

每个Nestjs应用程序都至少有一个@module()类 —— 根模块。根@Module()之所以这样命名，是因为它可以包含任何层次的子@Module()



最重要的特性如下：

- imports: 导入模块的列表,这些模块导出了此模块中所需提供者
- controllers：必须创建的一组控制器
- providers：由Nest注入器实例化的提供者,并且 可以至少在整个模块中共享
- exports：由本模块提供并应用在其他模块中可用的提供者的子集



### Services

service服务者，负责数据存储和检索。



### Controllers

控制器是一个处理HTTP请求的类，负责处理传入的请求和向客户端返回响应。当Nestjs框架接收到请求时，会指向路由去进行操作。



## 开始编码

创建users模块，service和controller

```shell
nest g module users
nest g service users
nest g controller users
nest g class users/user.entity
```



### 安装Mysql和typeORM

```shell
npm install --save @nestjs/typeorm typeorm mysql2
```

接下来开始编码

- 打开user.entity.ts输入如下

```js
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;
}
```

- 打开users.service.ts输入如下

```js
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['name', 'isActive'],
      where: [{ id: _id }],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    return this.usersRepository.save(user);
  }

  async updateUser(user: User) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}
```

- 打开users.controller.ts输入如下

```js
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getAll() {
    return this.service.getUsers();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.service.create(createUserDto);
  }

  @Put()
  update(@Body() user: User) {
    return this.service.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
```

- 打开users.module.ts文件应该包含如下代码

```js
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user-entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule { }
```

- 现在打开app.module.ts引入database 配置文件。数据库配置可以在根目录创建ormconfig.json文件，也可以在app.module.ts设置，下面是在app.module.ts的设置。

```js
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'nest_project_data',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
```

在vscode中打开终端并运行

```
npm run start
```

执行完成之后会发现无法运行

```
[TypeOrmModule] Unable to connect to the database. Retrying (2)... +3010ms
```

原因是没有打开数据库，这个小项目使用的是mysql，运行项目前需要先启动mysql。



项目实践github地址[nest-todolist](https://github.com/oneMoreTime1357/nest-todolist)

---

[Nestjs and Mysql in 5 Minutes](https://shaibenshimol.medium.com/nestjs-and-mysql-in-10-minutes-711e02ec1dab)

[Nest 文档](https://docs.nestjs.cn/7/introduction)