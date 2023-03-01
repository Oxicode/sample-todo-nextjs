import { LockClosedIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useList } from '@lib/hooks';
import { List } from '@prisma/client';
import { customAlphabet } from 'nanoid';
import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Avatar from './Avatar';
import TimeInfo from './TimeInfo';

type Props = {
    value: List & { owner: User };
    deleted?: (value: List) => void;
};

export default function TodoList({ value, deleted }: Props) {
    const router = useRouter();

    const { del } = useList();

    const deleteList = async () => {
        if (confirm('Are you sure to delete this list?')) {
            await del({ where: { id: value.id } });
            if (deleted) {
                deleted(value);
            }
        }
    };

    return (
        <div className="card w-80 bg-base-100 shadow-xl cursor-pointer hover:bg-gray-50">
            <Link href={`${router.asPath}list/${value.id}`}>
                <a>
                    <figure>
                        <Image
                            src={`https://picsum.photos/300/200?r=${value.id}`}
                            width={320}
                            height={200}
                            alt="Cover"
                        />
                    </figure>
                </a>
            </Link>
            <div className="card-body">
                <Link href={`${router.asPath}/${value.id}`}>
                    <a>
                        <h2 className="card-title line-clamp-1">{value.title || 'Missing Title'}</h2>
                    </a>
                </Link>
                <div className="card-actions flex w-full justify-between">
                    <div>
                        <TimeInfo value={value} />
                    </div>
                    <div className="flex space-x-2">
                        <Avatar user={value.owner} size={18} />
                        {value.private && (
                            <div className="tooltip" data-tip="Private">
                                <LockClosedIcon className="w-4 h-4 text-gray-500" />
                            </div>
                        )}
                        <TrashIcon
                            className="w-4 h-4 text-gray-500 cursor-pointer"
                            onClick={() => {
                                deleteList();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
