import {
  useDisclosure,
  Box,
  Flex,
  Img,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "@tanstack/react-router";
import { useContext, useRef } from "react";

import { SplashscreenRoute } from "../pages/splashscreen";
import { LandingRoute } from "../pages/landing";
import { AuthContext } from "../contexts/auth";
import { TestRoute } from "../pages/test";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { examEnvironmentAuthenticationToken, logout } =
    useContext(AuthContext)!;
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <Flex
        flexDirection="row"
        w={"100%"}
        alignItems={"start"}
        justifyContent={"space-between"}
        borderBottom="1px"
        borderBottomColor={"gray.300"}
        display="flex"
      >
        <Box>
          <Flex h="20" mx="8px" width={"100%"}>
            <Box
              py="1rem"
              mx="20px"
              textAlign="center"
              fontWeight="700"
              fontSize="16px"
              display="flex"
              alignItems="center"
            >
              <Img
                src=" https://cdn.freecodecamp.org/platform/universal/fcc_puck_500.jpg"
                width="32px"
                height="32px"
                mr="12px"
                borderRadius="5px"
              />
              Exam Environment
            </Box>
          </Flex>
        </Box>
        <Flex alignSelf={"center"} width={"auto"} pr={"1em"}>
          <IconButton ref={btnRef} aria-label="Menu" onClick={onOpen}>
            <HamburgerIcon />
          </IconButton>
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigate</DrawerHeader>
          <DrawerBody>
            <Button
              onClick={() => navigate({ to: LandingRoute.to })}
              variant="ghost"
              w={"100%"}
              rightIcon={<ArrowForwardIcon />}
            >
              Home
            </Button>
            {import.meta.env.DEV && (
              <Button
                onClick={() => navigate({ to: TestRoute.to })}
                variant="ghost"
                w={"100%"}
                rightIcon={<ArrowForwardIcon />}
              >
                Test (Dev Only)
              </Button>
            )}
            {import.meta.env.DEV && (
              <Button
                onClick={() => navigate({ to: SplashscreenRoute.to })}
                variant="ghost"
                w={"100%"}
                rightIcon={<ArrowForwardIcon />}
              >
                Splashscreen (Dev Only)
              </Button>
            )}
            {examEnvironmentAuthenticationToken && (
              <Button
                onClick={() => logout()}
                variant="ghost"
                w={"100%"}
                rightIcon={<ArrowForwardIcon />}
              >
                Logout
              </Button>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
