import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @Column("integer")
  age: number;
}

export default User;
