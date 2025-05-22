import React from "react"
import { Link } from "@tanstack/react-router"
import { Calendar, Home, Users } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "./ui/button"

export const NotFoundPage: React.FC = () => {
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
    <div className="flex min-h-screen flex-col bg-muted/30">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full">
          <motion.div className="text-center space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-9xl font-bold tracking-tighter text-gold-500">404</h1>
              <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </motion.div>

            {/* Illustration */}
            <motion.div variants={itemVariants} className="py-8">
              <div className="relative mx-auto w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Calendar icon */}
                    <motion.div
                      className="absolute top-0 left-0 bg-white rounded-lg shadow-lg p-2 border border-border"
                      animate={{
                        rotate: [-5, 5, -5],
                        transition: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      <Calendar className="h-10 w-10 text-gold-500" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 right-0 bg-white rounded-lg shadow-lg p-2 border border-border"
                      animate={{
                        rotate: [5, -5, 5],
                        transition: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      <Users className="h-10 w-10 text-gold-500" />
                    </motion.div>
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-gold-500"
                      animate={{
                        scale: [1, 1.1, 1],
                        transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      ?
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  <span>Go to Homepage</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <footer className="border-t border-border/40 py-6 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>© {new Date().getFullYear()} GatherFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
