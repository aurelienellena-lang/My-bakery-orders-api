import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, length: 255 })
    email: string

    @Column({ length: 100 })
    firstName: string

    @Column({ length: 100 })
    lastName: string

    @Column()
    passwordHash: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
    role: UserRole

    @Column({ type: 'varchar', nullable: true })
    refreshTokenHash: string | null

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}