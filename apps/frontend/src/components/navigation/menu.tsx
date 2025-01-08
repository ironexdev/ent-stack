"use client"

import {
  Home,
  Menu as MenuIcon,
  User,
  UserCheck,
  UserRoundPlus,
  X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import NavLink from "@frontend/components/navigation/nav-link"
import { cn } from "@frontend/lib/utils"
import {
  t_languageSwitcherTitle,
  t_navHome,
  t_navLogin,
  t_navMainMenu,
  t_navMyProfile,
  t_navRegistration,
} from "@shared/i18n/messages/t-navigation"
import LanguageSwitcher from "@frontend/components/navigation/language-switcher"
import useLocale from "@frontend/hooks/use-locale"
import MyButton from "@frontend/components/user-input/my-button"
import LogoutButton from "@frontend/components/auth/logout-button"
import { useIsUserAuthenticated } from "@frontend/stores/user-store"
import useRouteName from "@frontend/hooks/use-route-name"

export default function Menu() {
  // Store
  const isAuthenticated = useIsUserAuthenticated()
  // Local state
  const [showMenu, setShowMenu] = useState(false)
  // Refs
  const menuRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  // Utils
  const locale = useLocale()
  const routeName = useRouteName()

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    const eventType = isTouchDevice ? "touchstart" : "mousedown"

    document.addEventListener(eventType, handleClickOutside)
    document.addEventListener("keydown", handleKeyPress)

    if (showMenu) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.removeEventListener(eventType, handleClickOutside)
      document.removeEventListener("keydown", handleKeyPress)
      document.body.classList.remove("overflow-hidden")
    }
  }, [showMenu])

  return (
    <>
      <div
        className={cn(
          "invisible fixed inset-y-0 left-0 top-0 w-full bg-black/50 opacity-0 transition-all duration-xs ease-in-out",
          showMenu && "visible opacity-100",
        )}
      ></div>
      <menu
        data-testid="menu"
        ref={menuRef}
        className={cn(
          `fixed bottom-0 right-0 top-0 mx-auto w-[320px] origin-right overflow-y-auto bg-primary transition-transform duration-xs ease-in-out [transform:rotate3d(0,1,0,90deg)] desktop-w-md:w-[400px]`,
          showMenu && "[transform:rotate3d(0,0,0,0deg]",
        )}
      >
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between pl-5 pr-3 header-based-h desktop-w-md:pl-10">
            <div className="text-sm font-medium text-secondary">
              {t_navMainMenu(locale)}
            </div>
            <MyButton
              data-testid="menu-close"
              ref={triggerRef}
              onClick={() => toggleMenu()}
              variant="icon"
              size="icon"
            >
              <X className="size-[24px]" />
            </MyButton>
          </div>
          <div className="px-3 desktop-w-md:px-5">
            <NavLink
              className="block hover:no-underline"
              href="/"
              onClick={() => setShowMenu(false)}
            >
              <MyButton
                isActive={routeName === "/"}
                activeClassName="bg-button-secondary"
                variant="menu"
                size="menu"
              >
                <Home size="20" />
                <span className="ml-3">{t_navHome(locale)}</span>
              </MyButton>
            </NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink
                  className="mt-2.5 block hover:no-underline"
                  href="/login"
                  onClick={() => setShowMenu(false)}
                >
                  <MyButton
                    isActive={routeName === "/login"}
                    activeClassName="bg-button-secondary"
                    variant="menu"
                    size="menu"
                  >
                    <UserCheck size="20" />
                    <span className="ml-3">{t_navLogin(locale)}</span>
                  </MyButton>
                </NavLink>
                <NavLink
                  className="mt-2.5 block hover:no-underline"
                  href="/registration"
                  onClick={() => setShowMenu(false)}
                >
                  <MyButton
                    isActive={routeName === "/registration"}
                    activeClassName="bg-button-secondary"
                    variant="menu"
                    size="menu"
                  >
                    <UserRoundPlus size="20" />
                    <span className="ml-3">{t_navRegistration(locale)}</span>
                  </MyButton>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className="mt-2.5 block hover:no-underline"
                  href="/my-profile"
                  onClick={() => setShowMenu(false)}
                >
                  <MyButton
                    isActive={routeName === "/my-profile"}
                    activeClassName="bg-button-secondary"
                    variant="menu"
                    size="menu"
                  >
                    <User size="20" />
                    <span className="ml-3">{t_navMyProfile(locale)}</span>
                  </MyButton>
                </NavLink>
                <LogoutButton className="mt-2.5" />
              </>
            )}
          </div>
          <div className="mt-8 border-y border-b-[#181818] border-t-[#282828]"></div>
          <div className="px-3 desktop-w-md:px-5">
            <div className="flex items-center text-sm font-medium text-secondary header-based-h">
              {t_languageSwitcherTitle(locale)}
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </menu>
      <MyButton
        ref={triggerRef}
        onClick={() => toggleMenu()}
        variant="icon"
        size="icon"
        data-testid="menu-open"
        className="mr-[-8px]"
      >
        <MenuIcon className="size-[24px]" />
      </MyButton>
    </>
  )

  function toggleMenu() {
    setShowMenu(!showMenu)
  }

  function handleClickOutside(event: MouseEvent | TouchEvent) {
    const target = event.target as Node

    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      triggerRef.current &&
      !triggerRef.current.contains(target)
    ) {
      setShowMenu(false)
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setShowMenu(false)
    }
  }
}
