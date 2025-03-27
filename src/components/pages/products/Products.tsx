import ShoppingList from '../../screens/shoppinglist/ShoppingList';

const Products: React.FC = () => {
  return (
      <div className="fixed-container">
        <div className="container">
          <div className="App">
            <div>Products</div>
            <ShoppingList name="Mattix"/>
          </div>
        </div>
      </div>
  )
}

export default Products