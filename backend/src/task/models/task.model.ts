import { Field, ObjectType, Int } from '@nestjs/graphql';

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
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

    @Field({ nullable: true })
    description: string;
}