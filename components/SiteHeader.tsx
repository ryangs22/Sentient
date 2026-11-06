"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { OrganizationSwitcher, Show, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const SiteHeader = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const isLandingPage = pathname === "/";

  return <header className="fixed inset-x-0 top-0 z-20 flex h-18 items-center justify-between border-b border-white/6 bg-background/70 px-6 backdrop-blur-md md:px-10">
      <Link href={isSignedIn && !isLandingPage ? "/dashboard" : "/"} className="flex items-center">
        <Image src="/logos/sentient-logo-navbar-white.png" alt="Sentient" width={314} height={160} className="h-12 w-auto" priority />
      </Link>

        {isLandingPage && (
            <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                <Link href="#product" className="transition-colors hover:text-foreground">Produto</Link>
                <Link href="#how-it-works" className="transition-colors hover:text-foreground">Como funciona</Link>
                <Link href="#pricing" className="transition-colors hover:text-foreground">Preços</Link>
            </nav>
        )}

        <div className="flex items-center gap-3">
            <Show when='signed-out'>
                <SignInButton mode="modal">
                    <Button variant="ghost" size="sm">
                        Entrar
                    </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                    <Button size="sm">
                        Criar Conta
                    </Button>
                </SignUpButton>
            </Show>

            <Show when='signed-in'>
                <OrganizationSwitcher 
                    afterCreateOrganizationUrl="/dashboard" 
                    afterSelectOrganizationUrl="/dashboard"
                />
                
                {isLandingPage && (
                    <Button asChild size="sm">
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                )}

                <UserButton/>
            </Show>
        </div>
  </header>;
};

export default SiteHeader;