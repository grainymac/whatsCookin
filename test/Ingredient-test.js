import { expect } from 'chai'
import Ingredient from '../src/classes/Ingredient'

describe('Ingredient', () => {
  let ingredient

  beforeEach(() => {
    ingredient = new Ingredient(456, 'cheese', 550, 'lbs', 5)
  })

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function')
  })

  it('should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  })

  it('should have an id', () => {
    expect(ingredient.id).to.equal(456)
  })

  it('should have a name', () => {
    expect(ingredient.name).to.equal('cheese')
  })

  it('should have a cost', () => {
    expect(ingredient.estimatedCostInCents).to.equal(550)
  })

  it('should have units', () => {
    expect(ingredient.units).to.equal('lbs')
  })

  it('should have an amount', () => {
    expect(ingredient.amount).to.equal(5)
  })
})
