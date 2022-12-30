import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useMemo, useState } from "react";
import { CheckoutFormModal } from "../components/CheckoutFormModal";

export interface Game {
  id: number;
  name: string;
  size: number;
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const PENDRIVE_SIZE = {
  "3972844748.8": "4GB (3,7GB)",
  "7945689497.6": "8GB (7,4GB)",
  "15676630630.4": "16GB (14,6GB)",
  "31353261260.8": "32GB (29,2GB)",
};

interface HomeProps {
  games: Game[];
}

export default function Home({ games: gamesContent }: HomeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();

  const toast = useToast();

  const [pendriveSize, setPendriveSize] = useState("31353261260.8");
  const [searchGame, setSearchGame] = useState("");

  const [gamesSelecteds, setGamesSelecteds] = useState<Game[]>([]);

  const games: Game[] = useMemo(() => {
    return gamesContent.filter(
      (game) =>
        !gamesSelecteds.some((gameSelected) => gameSelected.id === game.id) &&
        (searchGame.length === 0 ||
          game.name.toLowerCase().includes(searchGame.toLowerCase()))
    );
  }, [gamesSelecteds, searchGame, gamesContent]);

  const sizeTotalOfGamesSelecteds = useMemo(() => {
    return gamesSelecteds.reduce((total, game) => total + game.size, 0);
  }, [gamesSelecteds]);

  const onCloseModal = () => {
    onClose();
    setSearchGame("");
    setGamesSelecteds([]);
  };

  return (
    <>
      <Head>
        <title>Cyber do Gilberto</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="100ch" pb="150px">
        <Heading mt={4} color="primary.500" textAlign="left">
          Qual o tamanho do seu Pen Drive?
        </Heading>
        <RadioGroup
          mt={4}
          onChange={(e) => {
            setPendriveSize(e);
            setGamesSelecteds([]);
          }}
          value={pendriveSize}
        >
          <Stack spacing={5} direction="row">
            <Radio colorScheme="primary.500" value="3972844748.8">
              {PENDRIVE_SIZE["3972844748.8"]}
            </Radio>
            <Radio colorScheme="primary.500" value="7945689497.6">
              {PENDRIVE_SIZE["7945689497.6"]}
            </Radio>
            <Radio colorScheme="primary.500" value="15676630630.4">
              {PENDRIVE_SIZE["15676630630.4"]}
            </Radio>
            <Radio colorScheme="primary.500" value="31353261260.8">
              {PENDRIVE_SIZE["31353261260.8"]}
            </Radio>
          </Stack>
        </RadioGroup>
        {gamesSelecteds.length > 0 ? (
          // <Box position="sticky" top="0" bg="background" zIndex={10}>
          <Box>
            <Heading mt={4} color="primary.500" textAlign="left">
              Jogos Selecionados
            </Heading>
            <Heading fontSize="xl" mt={4} color="primary.500" textAlign="left">
              Tamanho total - {formatBytes(sizeTotalOfGamesSelecteds)}
            </Heading>
            <VStack alignItems="flex-start" gap={2} mt={6}>
              {gamesSelecteds.map((game) => (
                <Checkbox
                  key={game.id}
                  isChecked={true}
                  onChange={(_) =>
                    setGamesSelecteds((prev) =>
                      prev.filter((gameSelected) => gameSelected.id !== game.id)
                    )
                  }
                >
                  {game.name} - {formatBytes(game.size)}
                </Checkbox>
              ))}
            </VStack>
          </Box>
        ) : null}
        <Heading mt={4} color="primary.500" textAlign="left">
          Escolha os jogos
        </Heading>
        <Input
          value={searchGame}
          onChange={(e) => setSearchGame(e.target.value)}
          placeholder="Pesquisar jogo"
          mt={6}
        />
        <VStack alignItems="flex-start" gap={2} mt={6}>
          {games.map((game) => (
            <Checkbox
              key={game.id}
              isChecked={gamesSelecteds.some(
                (gameSelected) => gameSelected.id === game.id
              )}
              onChange={(_) => {
                const sizeAfterAdd = sizeTotalOfGamesSelecteds + game.size;
                if (sizeAfterAdd > Number(pendriveSize)) {
                  toast({
                    description:
                      "Sem espaço disponível para adicionar mais jogos.",
                    status: "warning",
                    position: "top-right",
                    duration: 5000,
                  });
                } else {
                  setGamesSelecteds((prev) =>
                    [...prev, game].sort((a, b) => a.name.localeCompare(b.name))
                  );
                }
              }}
            >
              {game.name} - {formatBytes(game.size)}
            </Checkbox>
          ))}
        </VStack>
      </Container>
      <Flex
        zIndex={99}
        width="100%"
        as="footer"
        position="fixed"
        bottom={0}
        p={6}
        align="center"
        justify="center"
        bg="background"
        direction="column"
        borderTop="solid 1px white"
      >
        <Flex justifyContent="flex-end" width="100%" maxWidth="100ch">
          <Button
            w={["100%", null, null, "200px"]}
            h={50}
            px={2}
            onClick={() => {
              if (!gamesSelecteds.length) {
                return toast({
                  description: "Seleciona pelo menos um jogo.",
                  status: "warning",
                  position: "top-right",
                  duration: 2000,
                });
              } else {
                onOpenForm();
              }
            }}
          >
            Finalizar
          </Button>
        </Flex>
      </Flex>
      <CheckoutFormModal
        isOpen={isOpenForm}
        onClose={onCloseForm}
        gamesSelecteds={gamesSelecteds}
        pendriveSize={pendriveSize}
        sizeTotalOfGamesSelecteds={sizeTotalOfGamesSelecteds}
        onOpenSuccessModal={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        isCentered
        size={["sm", null, null, "lg"]}
      >
        <ModalOverlay />
        <ModalContent bg="background">
          <ModalHeader>Pedido feito com sucesso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={["md", null, null, "lg"]}>
              Seu pedido foi feito com sucesso!!
            </Text>
            <Text fontSize={["md", null, null, "lg"]}>
              Entraremos em contato com você em breve.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" h={50} onClick={onCloseModal}>
              Entendi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getStaticProps() {
  try {
    const params = new URLSearchParams();
    params.append("key", process.env.GOOGLE_API_KEY_ID as string);

    let games: Game[] = [];

    const data = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${
        process.env.SPREADSHEET_ID as string
      }/values/${process.env.SPREADSHEET_NAME as string}/?${params.toString()}`
    );

    const gamesResult = await data.json();

    games =
      gamesResult?.values?.map((row: string[], id: number) => ({
        id,
        name: row[0] ?? "",
        size: Number(row[1] ?? 0),
      })) ?? [];

    console.log(games);
    return {
      props: {
        games,
        revalidate: 60 * 60 * 24 * 7,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
