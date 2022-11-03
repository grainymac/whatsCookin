import { expect } from 'chai'
import Ingredient from '../src/classes/Ingredient'
import { ingredientSampleData } from '../src/data/ingredientSampleData'
import { recipeSampleData } from '../src/data/recipeSampleData'

describe('Ingredient', () => {
  let ingredient, ingredient2

  beforeEach(() => {
    ingredient = Ingredient.fromIngredientData(ingredientSampleData[0].id, ingredientSampleData)
    ingredient2 = Ingredient.fromIngredientData(ingredientSampleData[3].id, ingredientSampleData, recipeSampleData[1])
  })

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function')
  })

  it('should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  })

  it('should have an id', () => {
    expect(ingredient.id).to.equal(20081)
  })

  it('should have a name', () => {
    expect(ingredient.name).to.equal('wheat flour')
    expect(ingredient2.name).to.equal('haas avocados')
  })

  it('should have a cost', () => {
    expect(ingredient.cost).to.equal(142)
  })

  it('should have a unit', () => {
    expect(ingredient.unit).to.equal(undefined)
    expect(ingredient2.unit).to.equal('')
  })

  it('should have an amount', () => {
    expect(ingredient.amount).to.equal(undefined)
    expect(ingredient2.amount).to.equal(1)
  })
})
