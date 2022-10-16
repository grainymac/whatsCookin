import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {

  it('should be a function', () => {
    expect(Recipe).to.be.a("function");
  })

  it('should be an instance of Recipe', () => {
    const recipe = new Recipe();

    expect(recipe).to.be.an.instanceOf(Recipe);
  })

  
})