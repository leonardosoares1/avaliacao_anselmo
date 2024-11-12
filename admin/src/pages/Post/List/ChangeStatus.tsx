import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import useToast from '@hooks/useToast';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

import PostService from '@services/post/PostService';

import helpers from '@helpers/index';

interface IOpenInputData {
  id: number;
  isActive: boolean;
  title: string;
}

export interface IRefProps {
  close(): void;
  open(data: IOpenInputData): void;
}

interface IInfo {
  id: number;
  isActive: boolean;
  title: string;
}

interface IProps {
  onReload: () => void;
}

const PostChangeStatus: ForwardRefRenderFunction<IRefProps, IProps> = (
  { onReload },
  ref,
) => {
  const toast = useToast();

  const [info, setInfo] = useState<IInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback((inputData: IOpenInputData): void => {
    setInfo({
      id: inputData.id,
      isActive: inputData.isActive,
      title: inputData.title,
    });
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const disablePost = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await PostService.disable({
        id: info!.id,
      });
      toast.show({
        title: 'Publicação desativada com sucesso',
        type: 'success',
      });
      handleClose();
      onReload();
    } catch (err) {
      helpers.errorHandling(err);
    } finally {
      setIsLoading(false);
    }
  }, [handleClose, info, onReload, toast]);

  const enablePost = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await PostService.enable({
        id: info!.id,
      });
      toast.show({
        title: 'Publicação ativada com sucesso',
        type: 'success',
      });
      handleClose();
      onReload();
    } catch (err) {
      helpers.errorHandling(err);
    } finally {
      setIsLoading(false);
    }
  }, [handleClose, info, onReload, toast]);

  const handleConfirm = useCallback((): void => {
    if (info?.isActive) {
      disablePost();
      return;
    }
    enablePost();
  }, [disablePost, enablePost, info?.isActive]);

  useImperativeHandle(
    ref,
    () => ({
      open: handleOpen,
      close: handleClose,
    }),
    [handleClose, handleOpen],
  );

  return (
    <Dialog modal open={isOpen}>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Confirmação pendente</DialogTitle>
          <DialogDescription>
            {`Você está prestes a `}
            <b className="font-semibold">
              {info?.isActive ? 'DESATIVAR' : 'ATIVAR'}
            </b>{' '}
            <b className="font-semibold">{info?.title}</b>, tem certeza que
            deseja continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-[8rem_1fr] gap-x-2">
          <Button
            disabled={isLoading}
            onClick={handleClose}
            type="button"
            variant="destructive"
          >
            Cancelar
          </Button>
          <Button
            className="bg-blue-400 text-white hover:bg-blue-500"
            disabled={isLoading}
            onClick={handleConfirm}
            type="button"
          >
            Sim, tenho certeza
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default forwardRef(PostChangeStatus);
