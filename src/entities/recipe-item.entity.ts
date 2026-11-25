import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm'
import { Product } from './product.entity'
import { Ingredient } from './ingredient.entity'


@Entity('recipe_items')
@Unique(['product', 'ingredient']) // un ingrédient une seule fois par recette
export class RecipeItem {
    @PrimaryGeneratedColumn()
    id: number

    // Si on supprime le produit, ses lignes de recette partent avec
        @ManyToOne(() => Product, (product) => product.recipeItems, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'productId' })
    product: Product

    // On interdit de supprimer un ingrédient utilisé dans une recette
    @ManyToOne(() => Ingredient, { onDelete: 'RESTRICT', eager: true, nullable: false })
    @JoinColumn({ name: 'ingredientId' })
    ingredient: Ingredient

    // Quantité dans l'unité de l'ingrédient (g, ml ou pièce)
    @Column({ type: 'int' })
    quantity: number
}