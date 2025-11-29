import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeletePostDto {
	@Expose()
	@IsUUID(7, { message: 'Id must be a uuid.' })
	@IsNotEmpty({ message: 'Id is required.' })
	public id!: string;
}
