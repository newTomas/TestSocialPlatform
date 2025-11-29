import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
	@Expose()
  @IsString({ message: 'RefreshToken must be a string.' })
  @IsNotEmpty({ message: 'RefreshToken is required.' })
  public refreshToken!: string;
}
