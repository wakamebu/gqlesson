import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';

@ObjectType()
export class Task {
    //IDでもいいが、IDの実態は数値ではなくユニークな文字列
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    dueDate: string;

    @Field()
    status: Status;

    @Field({ nullable: true })
    description: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}