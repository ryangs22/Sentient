"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const SiteHeader = () => {
  const isSignedIn = false;
  const isLandingPage = true;

  return <header className="fixed inset-x-0 top-0 z-20 flex h-18 items-center justify-between border-b border-white/6 bg-background/70 px-6 backdrop-blur-md md:px-10">
      <Link href={isSignedIn && !isLandingPage ? "/dashboard" : "/"} className="flex items-center">
        <Image src="/brand/sentient-logo-navbar-dark.png" alt="Sentient" width={314} height={160} className="h-12 w-auto" priority />
      </Link>

        {isLandingPage && (
            <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                <Link href="#product" className="transition-colors hover:text-foreground">Produto</Link>
                <Link href="#how-it-works" className="transition-colors hover:text-foreground">Como funciona</Link>
                <Link href="#pricing" className="transition-colors hover:text-foreground">Preços</Link>
            </nav>
        )}

        <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Criar Conta</Link>
            </Button>
        </div>
  </header>;
};

export default SiteHeader;