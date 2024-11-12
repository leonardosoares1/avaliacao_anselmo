import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';

import { Search, X } from 'lucide-react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@components/ui/button';
import { Form, FormControl, FormField } from '@components/ui/form';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

export interface IRefProps {
  getFormData(): {
    is_active: '1' | '0' | '';
    title: string;
  };
  resetForm(): void;
}

const formSchema = z.object({
  is_active: z.enum(['1', '0', '']),
  title: z.string(),
});

const statusOptions = [
  { value: '1', label: 'Ativo' },
  { value: '0', label: 'Inativo' },
];

interface IProps {
  isLoading: boolean;
  onClear(): void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export type FormType = z.infer<typeof formSchema>;

const PostFilter: ForwardRefRenderFunction<IRefProps, IProps> = (
  { isLoading, onClear, onSubmit },
  ref,
) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onBlur',
    defaultValues: {
      is_active: '',
      title: '',
    },
  });

  useImperativeHandle(ref, () => ({
    resetForm: () => form.reset(),
    getFormData: () => form.getValues(),
  }));

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-[16rem_8rem_repeat(2,_2rem)] items-end gap-x-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormControl>
              <Input
                error={fieldState.error?.message}
                label="Título"
                {...field}
              />
            </FormControl>
          )}
        />
        <FormField
          control={form.control}
          name="is_active"
          render={({ field, fieldState }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger
                  error={fieldState.error?.message}
                  label="Status"
                  onBlur={field.onBlur}
                >
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {statusOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Button
          disabled={isLoading}
          size={'icon'}
          title="Pesquisar"
          type="submit"
        >
          <Search size={21} strokeWidth={1.5} />
        </Button>
        <Button
          disabled={isLoading}
          onClick={onClear}
          size={'icon'}
          title="Limpar pesquisa"
          type="button"
          variant={'destructive'}
        >
          <X size={21} strokeWidth={1.5} />
        </Button>
      </form>
    </Form>
  );
};

export default forwardRef(PostFilter);
