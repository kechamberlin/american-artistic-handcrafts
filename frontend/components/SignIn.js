import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  return (
    <Form method="POST">
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            // value
            // onChange
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            // value
            // onChange
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
