import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetPostDto {
	@Expose()
	@IsUUID(7, { message: 'Id must be a number.' })
	@IsNotEmpty({ message: 'Id is required.' })
	@Transform(val => BigInt(val.value))
	public id!: string;
}
