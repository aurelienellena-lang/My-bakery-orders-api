import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { RecipeItem } from './recipe-item.entity' 
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, length: 100 })
    name: string

    @Column({ type: 'text', nullable: true })
    description: string | null

    // Prix en CENTIMES (ex. 1,20 € → 120)
    @Column({ type: 'int' })
    priceCents: number

    @Column({ default: true })
    isAvailable: boolean
        // Un produit → plusieurs lignes de recette
    @OneToMany(() => RecipeItem, (item) => item.product, { cascade: true })
    recipeItems: RecipeItem[]
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}