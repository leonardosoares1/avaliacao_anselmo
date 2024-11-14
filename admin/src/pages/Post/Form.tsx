import { useCallback, useEffect, useState } from 'react';

import SunEditor from 'suneditor-react';

import { useForm } from 'react-hook-form';

import 'suneditor/dist/css/suneditor.min.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { pt_br as ptBr } from 'suneditor/src/lang';
import { z } from 'zod';

import IPostDetails from '@models/PostDetails';

import PageTitle from '@components/PageTitle';
import { Button } from '@components/ui/button';
import { Form, FormControl, FormField } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';

import errorsValidation from '@errors/validation';

const schema = z.object({
  isActive: z.enum(['1', '0']),
  content: z.string().trim().min(1, { message: errorsValidation.required }),
  subtitle: z.string().trim().min(1, { message: errorsValidation.required }),
  title: z.string().trim().min(1, { message: errorsValidation.required }),
  thumbnail: z.string().trim().min(1, { message: errorsValidation.required }),
});

export type FormType = z.infer<typeof schema>;

interface IProps {
  defaultValues?: IPostDetails;
  isLoading: boolean;
  onSubmit(data: FormType): void;
  title: string;
}

const PostForm = ({ defaultValues, isLoading, onSubmit, title }: IProps) => {
  const [bodyContent, setBodyContent] = useState<string>(
    defaultValues?.content || '',
  );

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      isActive: defaultValues?.isActive ? '0' : '1',
      content: defaultValues?.content || '',
      subtitle: defaultValues?.subtitle || '',
      thumbnail: defaultValues?.thumbnail || '',
      title: defaultValues?.title || '',
    },
  });

  const handleSetBodyContent = useCallback(
    (text: string) => {
      setBodyContent(text);
      form.setValue('content', text);
    },
    [form],
  );

  useEffect(() => {
    form.setValue('content', bodyContent);
  }, [bodyContent, form]);

  return (
    <main className="max-w-[100rem] min-h-[calc(100vh-5.7rem)] w-full overflow-x-hidden py-10 px-8 mx-auto bg-white">
      <PageTitle canGoBack>{title}</PageTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <p className="mb-2 text-base font-medium text-blue-400">
            Dados gerais
          </p>
          <div
            className={cn(
              'mb-4 grid gap-3',
              !defaultValues?.id
                ? 'grid-cols-[repeat(3,1fr)_10rem]'
                : 'grid-cols-[repeat(3,1fr)]',
            )}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormControl>
                  <Input
                    error={fieldState.error?.message}
                    label="Título"
                    maxLength={255}
                    {...field}
                  />
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field, fieldState }) => (
                <FormControl>
                  <Input
                    error={fieldState.error?.message}
                    label="Subtítulo"
                    maxLength={255}
                    {...field}
                  />
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field, fieldState }) => (
                <FormControl>
                  <Input
                    error={fieldState.error?.message}
                    label="Link imagem"
                    maxLength={255}
                    {...field}
                  />
                </FormControl>
              )}
            />
            {!defaultValues?.id && (
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      className="grid grid-cols-2 gap-0"
                      defaultValue={field.value}
                      label="Ativo"
                      onValueChange={field.onChange}
                    >
                      <RadioGroupItem
                        className="peer/true hidden"
                        id="1"
                        value="1"
                      />
                      <label className="radio-left" htmlFor="1">
                        Sim
                      </label>
                      <RadioGroupItem
                        className="peer/false hidden"
                        id="0"
                        value="0"
                      />
                      <label className="radio-right" htmlFor="0">
                        Não
                      </label>
                    </RadioGroup>
                  </FormControl>
                )}
              />
            )}
          </div>
          <p className="mb-2 text-sm font-medium text-gray-500">Conteúdo</p>
          <div className="min-h-[30rem] w-full rounded-md border border-gray100 bg-white p-1 font-normal">
            <SunEditor
              lang={ptBr}
              onChange={handleSetBodyContent}
              setContents={bodyContent}
              setOptions={{
                mode: 'classic',
                maxHeight: '30rem',
                minHeight: '30rem',
                defaultStyle:
                  'font-family: Nunito Sans, sans-serif; font-size: 14px',
                fontSize: [14, 16, 18, 20, 24, 36],
                formats: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                buttonList: [
                  ['undo', 'redo', 'fontSize', 'formatBlock'],
                  ['bold', 'underline', 'italic', 'strike'],
                  ['fontColor', 'hiliteColor', 'textStyle'],
                  ['align', 'list'],
                  ['table', 'image'],
                ],
              }}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button
              className="w-44 hover:bg-blue-400 bg-blue-500 text-white"
              disabled={isLoading}
              type="submit"
            >
              Confirmar
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default PostForm;
