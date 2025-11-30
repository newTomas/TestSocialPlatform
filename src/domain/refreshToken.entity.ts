import { RefreshToken } from '../generated/prisma/client.js';

export class RefreshTokenEntity {
	private constructor(private readonly props: RefreshToken) { }

	public static fromDto(data: RefreshToken): RefreshTokenEntity {
		return new RefreshTokenEntity(data);
	}

	public isExpired(): boolean {
		return this.props.expiredAt > new Date();
	}

	public getSnapshot(): RefreshToken {
		return { ...this.props };
	}

	public get id() {
		return this.props.id;
	}
}
