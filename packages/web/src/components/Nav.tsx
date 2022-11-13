import * as React from "react"
import { BiCog, BiExit, BiMoon, BiSun, BiUser } from "react-icons/bi"
import {
  Avatar,
  Box,
  Button,
  Container,
  Fade,
  HStack,
  Icon,
  Text,
  LinkProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react"
import Link from "./Link"
import { useRouter } from "next/router"

import { Role } from "lib/graphql"
import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"

import { LinkButton } from "./LinkButton"
import { FiChevronDown } from "react-icons/fi"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}
export const NavLink: React.FC<React.PropsWithChildren<NavLinkProps>> = ({ href, children, ...props }) => {
  const router = useRouter()
  const active = router.asPath.includes(href)

  return (
    <LinkButton href={href} size="sm" variant={active ? "secondary" : "transparent"}>
      {children}
    </LinkButton>
  )
}

export function Nav() {
  const { me, loading } = useMe()
  const logout = useLogout()
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"

  return (
    <Box
      w="100%"
      pos="fixed"
      top={0}
      left={0}
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      zIndex={500}
    >
      <Container
        maxW="8xl"
        display="flex"
        transition="200ms all"
        height="24"
        bg={useColorModeValue("white", "gray.800")}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        {/* Left link list */}
        <HStack>
          <HomeLink href="/" color="gray.900" _hover={{ color: "gray.600" }} pl={0} mr={3} fontWeight="bold">
            petal
          </HomeLink>
          <NavLink href="/movie">Movies</NavLink>
          <NavLink href="/tv">TV</NavLink>
          <NavLink href="/music">Music</NavLink>
          <NavLink href="/books">Books</NavLink>
          <NavLink href="/peopel">People</NavLink>
        </HStack>

        {/* Right link list */}

        {!me && !loading && (
          <Fade in>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
              <LinkButton href="/login" variant="outline" size="md">
                Login
              </LinkButton>
              <LinkButton href="/register" variant="primary" size="md">
                Register
              </LinkButton>
            </HStack>
          </Fade>
        )}

        {/* Right menu list */}
        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            variant="tertiary"
            size="lg"
            display={{ base: "flex", md: me ? "flex" : "none" }}
            rightIcon={<Icon as={FiChevronDown} />}
          >
            <Flex align="center" gap="3">
              <Avatar size="xs" name={me?.fullName} src="https://bit.ly/sage-adebayo" />
              <Text variant="2">{me?.firstName}</Text>
            </Flex>
          </MenuButton>

          <MenuList fontSize="md">
            {me ? (
              <>
                <Link href="/profile">
                  <MenuItem icon={<Box as={BiUser} boxSize="16px" />}>Profile</MenuItem>
                </Link>
                {me.role === Role.Admin && (
                  <Link href="/admin">
                    <MenuItem icon={<Box as={BiCog} boxSize="16px" />}>Admin</MenuItem>
                  </Link>
                )}
                <MenuDivider />
                <MenuItem
                  closeOnSelect={false}
                  icon={<Box as={isDark ? BiSun : BiMoon} boxSize="16px" />}
                  onClick={toggleColorMode}
                >
                  Toggle theme
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout()} icon={<Box as={BiExit} boxSize="16px" />}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  closeOnSelect={false}
                  icon={<Box as={isDark ? BiSun : BiMoon} boxSize="16px" />}
                  onClick={toggleColorMode}
                >
                  Toggle theme
                </MenuItem>
                <MenuDivider />
                <Link href="/watchlist">
                  <MenuItem>Watchlist</MenuItem>
                </Link>
                <Link href="/ratings">
                  <MenuItem>Ratings</MenuItem>
                </Link>
                <Link href="/lists">
                  <MenuItem>Lists</MenuItem>
                </Link>
                <MenuDivider />
                <Link href="/login">
                  <MenuItem>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem fontWeight="semibold">Register</MenuItem>
                </Link>
              </>
            )}
          </MenuList>
        </Menu>
      </Container>
    </Box>
  )
}

interface HomeLinkProps extends LinkProps {
  href: string
}

export function HomeLink({ href, ...props }: HomeLinkProps) {
  const { asPath } = useRouter()
  const isActive = asPath === href

  return (
    <Link
      textDecor="none !important"
      _hover={{ color: isActive ? "purple.600" : "purple.500" }}
      color={isActive ? "purple.600" : "gray.500"}
      href={href}
      {...props}
    >
      {props.children}
    </Link>
  )
}
