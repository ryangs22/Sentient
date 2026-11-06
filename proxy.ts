//Este arquivo é usado para configurar o middleware do Clerk no Next.js. Ele importa a função clerkMiddleware do pacote @clerk/nextjs/server e a exporta como padrão. Isso permite que o middleware do Clerk seja aplicado a todas as rotas da aplicação, garantindo que a autenticação e autorização sejam gerenciadas corretamente.

import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};