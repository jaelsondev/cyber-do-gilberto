import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { validatePhone } from "validations-br";
import InputMask from "react-input-mask";
import { formatBytes, Game, PENDRIVE_SIZE } from "../../pages";

interface ICheckoutForm {
  name: string;
  neighborhood: string;
  street: string;
  number: string;
  paymentMethod: string;
  whatsapp: string;
}

const createCheckoutFormSchema = yup.object({
  name: yup.string().required("O nome é obrigatório."),
  neighborhood: yup.string().required("O bairro é obrigatório."),
  street: yup.string().required("A rua é obrigatória."),
  number: yup.string().required("O número é obrigatório."),
  paymentMethod: yup.string().required("A forma de pagamento é obrigatória."),
  whatsapp: yup
    .string()
    .test("is-whatsapp", "Whatsapp inválido.", (whatsapp) =>
      whatsapp ? validatePhone(whatsapp) : false
    )
    .required("O whatsapp é obrigatório."),
});

interface ICheckoutFormModal {
  isOpen: boolean;
  onClose: () => void;
  onOpenSuccessModal: () => void;
  gamesSelecteds: Game[];
  pendriveSize: string;
  sizeTotalOfGamesSelecteds: number;
}

export function CheckoutFormModal({
  isOpen,
  onClose,
  gamesSelecteds,
  pendriveSize,
  sizeTotalOfGamesSelecteds,
  onOpenSuccessModal,
}: ICheckoutFormModal) {
  const toast = useToast();

  const defaultValues: ICheckoutForm = {
    name: "",
    neighborhood: "",
    street: "",
    number: "",
    paymentMethod: "",
    whatsapp: "",
  };

  const methods = useForm<ICheckoutForm>({
    defaultValues,
    resolver: yupResolver(createCheckoutFormSchema),
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    control,
  } = methods;

  const onSubmit = async (data: ICheckoutForm) => {
    const gamesText = gamesSelecteds
      .map((game) => `${game.name} - ${formatBytes(game.size)}`)
      .join("\n");

    const text = `DADOS DO CLIENTE:\n
Nome: ${data.name}
Endereço: ${data.street} ${data.number} - ${data.neighborhood}
Whatsapp: ${data.whatsapp}
Forma de pagamento: ${data.paymentMethod}
Pen drive: ${PENDRIVE_SIZE[pendriveSize as keyof typeof PENDRIVE_SIZE]}\n
JOGOS - ${formatBytes(sizeTotalOfGamesSelecteds)}\n\n${gamesText}`;

    try {
      const data = await fetch(
        encodeURI(
          `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_CHAT_ID}&text=${text}`
        ),
        {
          method: "POST",
        }
      );

      if (data.status >= 400) {
        toast({
          description: "Falha ao fazer o pedido. Tente novamente em breve",
          status: "error",
          position: "top-right",
          duration: 5000,
        });
      } else {
        onClose();
        reset(defaultValues);
        onOpenSuccessModal();
      }
    } catch (error) {
      toast({
        description: "Falha ao fazer o pedido. Tente novamente em breve",
        status: "error",
        position: "top-right",
        duration: 5000,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={["sm", null, null, "lg"]}
    >
      <ModalOverlay />
      <ModalContent bg="background" as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Preencha os dados</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Flex} flexDirection="column" gap={2}>
          <FormControl variant="floating" isInvalid={!!errors.name}>
            <Input {...register("name")} placeholder=" " h={50} />
            <FormLabel>Nome</FormLabel>

            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl variant="floating" isInvalid={!!errors.neighborhood}>
            <Input {...register("neighborhood")} placeholder=" " h={50} />
            <FormLabel>Bairro</FormLabel>

            <FormErrorMessage>{errors.neighborhood?.message}</FormErrorMessage>
          </FormControl>

          <FormControl variant="floating" isInvalid={!!errors.street}>
            <Input {...register("street")} placeholder=" " h={50} />
            <FormLabel>Rua</FormLabel>

            <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
          </FormControl>

          <FormControl variant="floating" isInvalid={!!errors.number}>
            <Input {...register("number")} placeholder=" " h={50} />
            <FormLabel>Número</FormLabel>

            <FormErrorMessage>{errors.number?.message}</FormErrorMessage>
          </FormControl>

          <FormControl variant="floating" isInvalid={!!errors.whatsapp}>
            <Input
              as={InputMask}
              mask="(99) 99999-9999"
              placeholder=" "
              h={50}
              {...register("whatsapp")}
            />
            <FormLabel>Whatsapp</FormLabel>

            <FormErrorMessage>{errors.whatsapp?.message}</FormErrorMessage>
          </FormControl>
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field: { ...props } }) => (
              <FormControl isInvalid={!!errors.paymentMethod}>
                <Select placeholder="Selecione a forma de pagamento" {...props}>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Pix">Pix</option>
                  <option value="Cartão de crédido ou débito">
                    Cartão de crédido ou débito
                  </option>
                </Select>
                <FormErrorMessage>
                  {errors.paymentMethod?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="primary"
            h={50}
            type="submit"
            isLoading={isSubmitting}
          >
            Enviar pedido
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
