import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

export enum IngredientUnit {
    GRAM = 'g',
    MILLILITER = 'ml',
    PIECE = 'piece',
}

@Entity('ingredients')
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, length: 100 })
    name: string

    @Column({ type: 'enum', enum: IngredientUnit })
    unit: IngredientUnit

    @Column({ type: 'int', default: 0 })
    stockQuantity: number

    @Column({ type: 'int', default: 0 })
    alertThreshold: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}