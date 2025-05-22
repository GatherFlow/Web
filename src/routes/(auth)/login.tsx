import { Button } from "@/core/components/ui/button"
import { Separator } from "@/core/components/ui/separator"
import { TITLE_TEMPLATE } from '@/core/constants'
import { canAccessAuth } from '@/core/middlewares/canAccessAuth'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Head } from '@unhead/react'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/(auth)/login')({
  beforeLoad: ({ context }) => canAccessAuth(context.auth),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  const avatarUrls = [
    'https://mighty.tools/mockmind-api/content/human/128.jpg',
    'https://mighty.tools/mockmind-api/content/human/92.jpg',
    'https://mighty.tools/mockmind-api/content/human/127.jpg',
    'https://mighty.tools/mockmind-api/content/human/94.jpg'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <React.Fragment>
      <Head titleTemplate={TITLE_TEMPLATE}>
        <title>Login</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
            <motion.div
              className="bg-background rounded-xl border border-border/50 p-8 shadow-sm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('auth.return-home')}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">{t('auth.login.title')}</h1>
                <p className="text-muted-foreground">{t('auth.login.description')}</p>
              </motion.div>
              <LoginForm />
              <motion.div variants={itemVariants} className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">{t('auth.thirdparty-fallback')}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </motion.div>
              <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-muted-foreground">
                {t('auth.signup.offer')}{" "}
                <Link to="/signup" className="font-medium text-gold-600 hover:text-gold-700">
                  {t('auth.signup.submit')}
                </Link>
              </motion.p>
            </motion.div>
            <div className="hidden md:block relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/90 to-gold-600/90 z-10" />
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-12">
                <div className="space-y-4 max-w-md">
                  <h2 className="text-3xl font-bold tracking-tight text-white">{t('promo.hero.catchphrase.fulltext')}</h2>
                  <p className="text-white/90">
                    {t('promo.hero.description')}
                  </p>
                  <div className="flex items-center gap-4 mt-8">
                    <div className="flex -space-x-2">
                      {avatarUrls.map((url, i) => (
                        <div
                          key={i}
                          className="inline-block size-8 rounded-full border-2 border-gold-500 overflow-hidden"
                        >
                          <img
                            src={url}
                            alt={`User ${i}`}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-white">{t('promo.hero.trust-section')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}
