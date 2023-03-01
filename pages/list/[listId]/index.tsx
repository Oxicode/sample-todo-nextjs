import { PlusIcon } from '@heroicons/react/24/outline';
import { useCurrentUser } from '@lib/context';
import { useTodo } from '@lib/hooks';
import { List, Todo, User } from '@prisma/client';
import TodoComponent from 'components/Todo';
import WithNavBar from 'components/WithNavBar';
import { GetServerSideProps } from 'next';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { getEnhancedPrisma } from 'server/enhanced-db';

type Props = {
    list: List;
    todos: (Todo & { owner: User })[];
};

export default function TodoList(props: Props) {
    const user = useCurrentUser();
    const [title, setTitle] = useState('');
    const { findMany, create } = useTodo();

    const { data: todos, mutate: refetch } = findMany(
        {
            where: { listId: props.list.id },
            include: {
                owner: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        },
        { initialData: props.todos, disabled: !props.list }
    );

    const _createTodo = async () => {
        try {
            const todo = await create({
                data: {
                    title,
                    owner: { connect: { id: user!.id } },
                    list: { connect: { id: props.list.id } },
                },
            });
            console.log(`Todo created: ${todo}`);
            setTitle('');
            refetch();
        } catch (err: any) {
            toast.error(`Failed to create todo: ${err.info?.message || err.message}`);
        }
    };

    if (!props.list) {
        return <></>;
    }

    return (
        <WithNavBar>
            <div className="container w-full flex flex-col items-center pt-12">
                <h1 className="text-2xl font-semibold mb-4">{props.list?.title}</h1>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Type a title and press enter"
                        className="input input-bordered w-72 max-w-xs mt-2"
                        value={title}
                        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                _createTodo();
                            }
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setTitle(e.currentTarget.value);
                        }}
                    />
                    <button onClick={() => _createTodo()}>
                        <PlusIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <ul className="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
                    {todos?.map((todo) => (
                        <TodoComponent
                            key={todo.id}
                            value={todo}
                            updated={() => {
                                refetch();
                            }}
                            deleted={() => {
                                refetch();
                            }}
                        />
                    ))}
                </ul>
            </div>
        </WithNavBar>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, params }) => {
    const db = await getEnhancedPrisma({ req, res });

    const list = await db.list.findUnique({
        where: { id: params!.listId as string },
    });
    if (!list) {
        return {
            notFound: true,
        };
    }

    const todos = await db.todo.findMany({
        where: { listId: params?.listId as string },
        include: {
            owner: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });

    return {
        props: { list, todos },
    };
};