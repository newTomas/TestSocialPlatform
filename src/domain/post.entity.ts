import { Post } from '../generated/prisma/client.js';
import { IJwtPayload } from '../interfaces/auth.interface.js';

export class PostEntity {
	private constructor(private readonly props: Post) { }

	public static fromDto(data: Post): PostEntity {
		return new PostEntity(data);
	}

	public updateText(text: string, user: IJwtPayload): void {
		if (this.props.deletedAt) {
			throw new Error('Cannot update a deleted post.');
		}

		if (this.props.userId !== user.userId) {
			throw new Error('Access Denied: You are not the author.');
		}

		this.props.text = text;
		this.props.updatedAt = new Date();
	}

	public delete(user: IJwtPayload): void {
		if (this.props.userId !== user.userId) {
			throw new Error('Access Denied: You are not the author.');
		}

		if (this.props.deletedAt) {
			throw new Error('Post is already deleted.');
		}

		this.props.deletedAt = new Date();
	}

	public getSnapshot(): Post {
		return { ...this.props };
	}

	public get id() {
		return this.props.id;
	}
}
