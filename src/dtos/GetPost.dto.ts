import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetPostDto {
	@Expose()
	@IsUUID(7, { message: 'Id must be a number.' })
	@IsNotEmpty({ message: 'Id is required.' })
	public id!: string;
}
