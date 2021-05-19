import { IsEmail, Length } from 'class-validator';
import { InputType, Field, ObjectType } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsEmail(undefined, { message: 'Debe agregar un email valido' })
  email: string;

  @Field(() => String)
  @Length(5, 20, { message: 'El usuario debe tener entre 5 - 20 carateres' })
  username: string;

  @Field(() => String)
  @Length(5, 255, { message: 'La contraseña debe tener al menos 5 carateres' })
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail(undefined, { message: 'Debe agregar un email valido' })
  email: string;

  @Field(() => String)
  @Length(0, 255, { message: 'Debe agregar una contraseña' })
  password: string;
}
