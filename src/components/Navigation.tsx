import React, { memo, useState, useCallback, useMemo } from "react"
import { Link } from "react-router-dom"
import { GlowButton } from "@/components/ui/glow-button"
import { Menu, X, Phone, Lock } from "lucide-react"
import { OptimizedLogo } from "@/components/ui/OptimizedLogo"
import { useThrottledScroll } from "@/hooks/useThrottledScroll"
import { CitiesModal } from "@/components/CitiesModal"

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)

  useThrottledScroll(useCallback((scrollY: number) => {
    setIsScrolled(scrollY > 50)
  }, []), 100)

  const scrollToContact = useCallback(() => {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const openServiceModal = useCallback(() => {
    setIsServiceModalOpen(true)
    closeMobileMenu()
  }, [closeMobileMenu])

  const navItems = useMemo(() => [
    { label: "О компании", href: "#about" },
    { label: "H2 Генераторы", href: "#products" },
    { label: "Eco Pro", href: "/eco-pro", isRoute: true },
    { label: "Список сервисов", onClick: openServiceModal, isButton: true },
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", href: "#contacts" }
  ], [openServiceModal])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-card-dark" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <OptimizedLogo size="small" priority={true} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.isButton ? (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.label}
                  </button>
                ) : item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              
                href="tel:+79098530468"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 animate-pulse" style={{
                  filter: 'drop-shadow(0 0 3px #40ffaa) drop-shadow(0 0 6px #40ffaa)',
                  animation: 'neon-flicker 2s infinite alternate'
                }} />
                <span className="font-medium">+7(909)853-04-68</span>
              </a>
              <GlowButton variant="outline" size="sm" className="bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30">
                <Lock className="w-4 h-4" />
                Кабинет партнера
              </GlowButton>
              <GlowButton variant="primary" size="sm" onClick={scrollToContact}>
                Заказать установку
              </GlowButton>
            </div>

            {/* Mobile Call Button - Always Visible */}
            <div className="md:hidden flex items-center space-x-2">
              <a href="tel:+79098530468">
                <GlowButton variant="outline" size="sm" className="bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30 hover:text-green-300 gap-2">
                  <Phone className="w-4 h-4" />
                  Позвонить
                </GlowButton>
              </a>
              {/* Mobile Menu Button */}
              <button
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  item.isButton ? (
                    <button
                      key={item.label}
                      onClick={openServiceModal}
                      className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      {item.label}
                    </button>
                  ) : item.isRoute ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </a>
                  )
                ))}
                <div className="pt-4 pb-2 space-y-3">
                  
                    href="tel:+79098530468"
                    className="flex items-center space-x-2 px-3 py-2 text-primary font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+7(909)853-04-68</span>
                  </a>
                  <div className="px-3 space-y-2">
                    <GlowButton variant="outline" size="sm" className="w-full bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30">
                      <Lock className="w-4 h-4" />
                      Кабинет партнера
                    </GlowButton>
                    <GlowButton variant="primary" size="sm" className="w-full" onClick={scrollToContact}>
                      Заказать установку
                    </GlowButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Модальное окно География работы */}
      <CitiesModal 
        open={isServiceModalOpen} 
        onOpenChange={setIsServiceModalOpen} 
      />
    </>
  )
})

Navigation.displayName = 'Navigation'

export default Navigation
