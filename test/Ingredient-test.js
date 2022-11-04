import { expect } from 'chai'
import Ingredient from '../src/classes/Ingredient'
import { ingredientSampleData } from '../src/data/ingredientSampleData'
import { recipeSampleData } from '../src/data/recipeSampleData'
import { usersSampleData } from '../src/data/usersSampleData'

describe('Ingredient', () => {
  let ingredient, ingredient2

  beforeEach(() => {
    ingredient = Ingredient.fromIngredientData(recipeSampleData[1].ingredients[0], ingredientSampleData)
    ingredient2 = Ingredient.fromIngredientData(usersSampleData.pantry[2], ingredientSampleData)
  })

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function')
  })

  it('should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  })

  it('should have an id', () => {
    expect(ingredient.id).to.equal(9037)
  })

  it('should have a name', () => {
    expect(ingredient.name).to.equal('haas avocados')
    expect(ingredient2.name).to.equal('wheat flour')
  })

  it('should have a cost', () => {
    expect(ingredient.cost).to.equal(275)
  })

  it('should have a unit', () => {
    expect(ingredient.unit).to.equal('')
    expect(ingredient2.unit).to.equal(undefined)
  })

  it('should have an amount', () => {
    expect(ingredient.amount).to.equal(1)
    expect(ingredient2.amount).to.equal(5)
  })
})
