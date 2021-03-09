import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: "FDR's Wheelchair",
    price: 50000,
    description: 'Cool chair',
  });
  return (
    <Form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <button onClick={clearForm} type="button">
        {/* <button onClick={clearForm} type="button">
        Clear Form
      </button>
      <button onClick={resetForm} type="button">
        Reset Form
      </button> */}
    </Form>
  );
}
