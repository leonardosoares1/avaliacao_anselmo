import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import pages from '@constants/pages';

import { Button } from '@components/ui/button';
import { Card, CardDescription, CardTitle } from '@components/ui/card';
import { Form, FormControl, FormField } from '@components/ui/form';
import { Input } from '@components/ui/input';

import AuthService from '@services/auth/AuthService';

import helpers from '@helpers/index';

import errorsValidation from '@errors/validation';

const schema = z.object({
  email: z.string().trim().min(1, { message: errorsValidation.required }),
  password: z.string().trim().min(1, { message: errorsValidation.required }),
});

export type FormType = z.infer<typeof schema>;

const Auth = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = useCallback(
    async (data: FormType) => {
      try {
        const response = await AuthService.create({
          email: data.email,
          password: data.password,
        });
        const token = response.token;
        localStorage.setItem('authToken', token);
        navigate(pages.post.list);
      } catch (error) {
        helpers.errorHandling(error);
      }
    },
    [navigate],
  );

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-[450px] p-4">
        <CardTitle className="text-4xl font-bold text-blue-400">
          Login
        </CardTitle>
        <CardDescription className="text-blue-400">
          Preencha os dados para o login
        </CardDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className={'mt-4 grid gap-5'}>
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormControl>
                    <Input
                      error={fieldState.error?.message}
                      label="Email"
                      maxLength={255}
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormControl>
                    <Input
                      error={fieldState.error?.message}
                      label="Senha"
                      secure
                      type="password"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button
                className="w-44 bg-blue-400 hover:bg-blue-500 text-white"
                type="submit"
              >
                Confirmar
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </main>
  );
};

export default Auth;
