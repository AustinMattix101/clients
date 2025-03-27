import './Product.css';
import { ShoppingList } from '../';
import { formReducer, INITIAL_STATE, ACTIONS } from './productReducer';
import { ChangeEvent, useReducer, useRef } from 'react';

const Products: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const tagRef = useRef<any>();

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ACTIONS.CHANGE_INPUT, payload: {name: e.target.name, value: e.target.value}});
  }

  const handleTags = () => {
    const tags: string[] = tagRef.current.value.split(",") as string[];
    tags.forEach((tag: string) => {
      dispatch({ type: ACTIONS.ADD_TAG, payload: tag });
    });
  }

  console.log(state);

  return (
      <div className="fixed-container">
        <div className="container">
          <div className="App">
            <div>Products</div>
            <ShoppingList />
            <div>
              <form>
                <input 
                  className='root__background-color'
                  type="text"
                  placeholder="Title" 
                  onChange={handleChange} 
                  name="title" 
                />
                <input 
                  className='root__background-color'
                  type="text"
                  placeholder="Desc" 
                  onChange={handleChange} 
                  name="desc" 
                />
                <input 
                  className='root__background-color'
                  type="number"
                  placeholder="Price" 
                  onChange={handleChange} 
                  name="price" 
                />
                <p>Category: {state.category}</p>
                <select onChange={handleChange} name="category" className='root__background-color'>
                  <option value="sneakers">Sneakers</option>
                  <option value="tshirts">T-shirts</option>
                  <option value="jeans">Jeans</option>
                </select>
                <p>Tags:</p>
                <textarea
                  ref={tagRef}
                  className="root__background-color"
                  placeholder="Seperate tags with commas..."
                ></textarea>
                <button onClick={handleTags} type="button">
                  Add Tags
                </button>
                <div className="tags">
                  {state.tags.map((tag: any) => (
                    <small
                      onClick={() => dispatch({ type: ACTIONS.REMOVE_TAG, payload: tag })}
                      key={tag}
                    >
                      {tag}
                    </small>
                  ))}
                </div>
                <div className="quantity">
                  <button onClick={() => dispatch({ type: ACTIONS.DECREASE})} type="button">
                    -
                  </button>
                  <span>Quantity ({state.quantity})</span>
                  <button onClick={() => dispatch({ type: ACTIONS.INCREASE})} type="button">
                    +
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Products;