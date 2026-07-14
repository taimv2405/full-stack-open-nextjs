'use client';

import { registerUser } from '@/app/actions/users';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/components/NotificationContext';

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, {});
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification('User registered successfully!', 'success');
      router.push('/login');
    }
  }, [state.success, showNotification, router]);

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
              required
              minLength={4}
            />
          </label>
        </div>
        {state.errors?.username && (
          <div style={{ color: 'red' }}>{state.errors.username}</div>
        )}

        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              defaultValue={state.values?.name}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input type="password" name="password" required minLength={4} />
          </label>
        </div>
        {state.errors?.password && (
          <div style={{ color: 'red' }}>{state.errors.password}</div>
        )}

        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              required
              minLength={4}
            />
          </label>
        </div>
        {state.errors?.passwordConfirm && (
          <div style={{ color: 'red' }}>{state.errors.passwordConfirm}</div>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
