import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
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
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { MdCheckCircle, MdWhatsapp } from "react-icons/md";
import { CheckoutFormModal } from "../components/CheckoutFormModal";
import Link from "next/link";

export interface Game {
  id: number;
  name: string;
  size: number;
  compatibility: string;
  cover: string;
  coverUri: string | null
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
  "62813896704": "64gb (58,5GB)",
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

  const [pendriveSize, setPendriveSize] = useState("");
  const [searchGame, setSearchGame] = useState("");
  const [message, setMessage] = useState("");

  const [gamesSelecteds, setGamesSelecteds] = useState<Game[]>([]);

  const games: Game[] = useMemo(() => {
    return gamesContent.filter(
      (game) =>
        searchGame.length === 0 ||
        game.name.toLowerCase().includes(searchGame.toLowerCase())
    ).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [searchGame, gamesContent]);

  useEffect(() => {
    const gamesSelectedsStorage = localStorage.getItem("@cybergilberto:gamesSelecteds");

    let pendriveSize = localStorage.getItem("@cybergilberto:pendriveSize") || "31353261260.8"

    const games = gamesSelectedsStorage ? JSON.parse(gamesSelectedsStorage) as Game[] : [];

    if (games.length) {
      const gamesFiltered = gamesContent.filter((game) => {
        return games.some((gameSelected) => gameSelected.size === game.size && gameSelected.name === game.name);
      });

      handleSetGamesSelecteds(gamesFiltered);
    } else {
      pendriveSize = "31353261260.8"
    }

    setPendriveSize(pendriveSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetGamesSelecteds = (gamesSelecteds: Game[]) => {
    localStorage.setItem("@cybergilberto:gamesSelecteds", JSON.stringify(gamesSelecteds));
    setGamesSelecteds(gamesSelecteds);
  }

  const sizeTotalOfGamesSelecteds = useMemo(() => {
    return gamesSelecteds.reduce((total, game) => total + game.size, 0);
  }, [gamesSelecteds]);

  const onCloseModal = () => {
    onClose();
    window.open(`https://wa.me/5588988722394?text=${message}`, "_blank");
    setMessage("");
    setSearchGame("");
    handleSetGamesSelecteds([]);
  };

  return (
    <>
      <Head>
        <title>Cyber do Gilberto</title>
        <meta name="description" content="Faça seu pedido" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Cyber do Gilberto" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:description" content="Faça seu pedido" />
        <meta property="og:site_name" content="Cyber do Gilberto" />
        <meta name="twitter:image:alt" content="Cyber do Gilberto" />
      </Head>
      <Container maxWidth="100ch" pb="150px">
        <Heading
          fontSize="xl"
          fontWeight="bold"
          mt={2}
          color="primary.500"
          textAlign="left"
        >
          Qual o tamanho do seu Pen Drive?
        </Heading>
        <RadioGroup
          mt={4}
          onChange={(e) => {
            setPendriveSize(e);
            localStorage.setItem("@cybergilberto:pendriveSize", e);
            if (Number(e) < Number(pendriveSize) && sizeTotalOfGamesSelecteds > Number(e)) {
              handleSetGamesSelecteds([]);
            }
          }}
          defaultValue={pendriveSize}
          value={pendriveSize}
        >
          <Wrap spacingY={2} spacingX={4} direction="row" >
            <Radio size="sm" _checked={{ backgroundColor: 'primary.500' }} colorScheme="primary.500" value="3972844748.8">
              <Box color={
                pendriveSize === "3972844748.8" ? "primary.500" : "unset"
              }>
                {PENDRIVE_SIZE["3972844748.8"].split(" ")[0]}{" "}
                {PENDRIVE_SIZE["3972844748.8"].split(" ")[1]}
              </Box>
            </Radio>
            <Radio size="sm" _checked={{ backgroundColor: 'primary.500' }} colorScheme="primary.500" value="7945689497.6">
              <Box color={
                pendriveSize === "7945689497.6" ? "primary.500" : "unset"
              }>
                {PENDRIVE_SIZE["7945689497.6"].split(" ")[0]}{" "}
                {PENDRIVE_SIZE["7945689497.6"].split(" ")[1]}
              </Box>
            </Radio>
            <Radio size="sm" _checked={{ backgroundColor: 'primary.500' }} colorScheme="primary.500" value="15676630630.4">
              <Box color={
                pendriveSize === "15676630630.4" ? "primary.500" : "unset"
              }>
                {PENDRIVE_SIZE["15676630630.4"].split(" ")[0]}{" "}
                {PENDRIVE_SIZE["15676630630.4"].split(" ")[1]}
              </Box>
            </Radio>
            <Radio size="sm" _checked={{ backgroundColor: 'primary.500' }} colorScheme="primary.500" value="31353261260.8">
              <Box color={
                pendriveSize === "31353261260.8" ? "primary.500" : "unset"
              }>
                {PENDRIVE_SIZE["31353261260.8"].split(" ")[0]}{" "}
                {PENDRIVE_SIZE["31353261260.8"].split(" ")[1]}
              </Box>
            </Radio>
            <Radio size="sm" _checked={{ backgroundColor: 'primary.500' }} colorScheme="primary.500" value="62813896704">
              <Box color={
                pendriveSize === "62813896704" ? "primary.500" : "unset"
              }>
                {PENDRIVE_SIZE["62813896704"].split(" ")[0]}{" "}
                {PENDRIVE_SIZE["62813896704"].split(" ")[1]}
              </Box>
            </Radio>
          </Wrap>
        </RadioGroup>

        <Wrap w="100%" justifyContent="space-between" align="center" mt={4}>
          <Heading
            fontSize="xl"
            fontWeight="bold"
            color="primary.500"
            textAlign="left"
            flex={1}
          >
            Jogos Selecionados
          </Heading>
          {gamesSelecteds.length > 0 ? (
            <Heading fontSize="md" mt={4} color="primary.500" textAlign="left">
              Tamanho - {formatBytes(sizeTotalOfGamesSelecteds)}
            </Heading>
          ) : null}
        </Wrap>

        {gamesSelecteds.length > 0 ? (
          <>
            <VStack alignItems="flex-start" gap={0} mt={4}>
              {gamesSelecteds.map((game) => (
                <Checkbox
                  key={game.id}
                  isChecked={true}
                  colorScheme="primary"
                  onChange={(_) => {
                    const gamesSelectedsFiltered = gamesSelecteds.filter((gameSelected) => gameSelected.id !== game.id)
                    handleSetGamesSelecteds(gamesSelectedsFiltered)
                  }}
                >
                  {game.name} - {formatBytes(game.size)}
                </Checkbox>
              ))}
            </VStack>
          </>
        ) : (
          <Text fontSize="md" mt={4} color="white" textAlign="left">
            Nenhum jogo selecionado. Comece selecionando jogos para o Pen Drive
          </Text>
        )}

        <Wrap w="100%" justifyContent="space-between" align="center" mt={4}>
          <Heading
            fontSize="xl"
            fontWeight="bold"
            color="primary.500"
            textAlign="left"
            flex={1}
          >
            Escolha os jogos
          </Heading>
        </Wrap>

        <Input
          value={searchGame}
          onChange={(e) => setSearchGame(e.target.value)}
          placeholder="Pesquisar jogo"
          mt={3}
        />

        <SimpleGrid columns={3} gap={4} mt={4}>
          {games.map((game) => {
            const isChecked = gamesSelecteds.some(
              (gameSelected) => gameSelected.id === game.id
            );
            return (
              <VStack
                key={game.id}
                onClick={(_) => {
                  if (isChecked) {
                    const gamesSelectedsFiltered = gamesSelecteds.filter((gameSelected) => gameSelected.id !== game.id)
                    handleSetGamesSelecteds(gamesSelectedsFiltered)
                    return;
                  }

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
                    const gamesSelectedsFiltered = [...gamesSelecteds, game].sort((a, b) =>
                      a.name.localeCompare(b.name)
                    )
                    handleSetGamesSelecteds(gamesSelectedsFiltered)
                  }
                }}
              >
                <VStack spacing={0} position="relative">
                  <Image
                    boxSize="170px"
                    objectFit="fill"
                    src={game.coverUri || `/covers/${game.cover}`}
                    alt={game.name}
                  />
                  {isChecked ? (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      w="100%"
                      h="100%"
                      bg="#0000004D"
                      position="absolute"
                      zIndex={1}
                    >
                      <Icon as={MdCheckCircle} color="white" fontSize={36} />
                    </Flex>
                  ) : null}
                </VStack>
                <Text
                  lineHeight={1.2}
                  fontSize="sm"
                  color={isChecked ? "primary.500" : "unset"}
                >
                  {game.name} -{" "}
                  <Text as="span" fontWeight="bold">
                    {formatBytes(game.size)}
                  </Text>
                </Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Container>
      <Flex
        zIndex={99}
        width="100%"
        as="footer"
        position="fixed"
        bottom={0}
        py={2}
        px={6}
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
        setMessage={setMessage}
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

export async function getServerSideProps() {
  try {
    const params = new URLSearchParams();
    params.append("key", process.env.GOOGLE_API_KEY_ID as string);

    let games: Game[] = [];

    const data = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID as string
      }/values/${process.env.SPREADSHEET_NAME as string}/?${params.toString()}`
    );

    const gamesResult = await data.json();

    games =
      gamesResult?.values?.map((row: string[], id: number) => {
        return ({
          id,
          name: row[0] ?? "",
          size: Number(row[1] ?? 0),
          compatibility: `${row[2] ?? "-"}`,
          cover: row[3],
          coverUri: row[4] || null,
        })
      }) ?? [];

    return {
      props: {
        games,
        revalidate: 60,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

