export const PromoFooter = () => (
  <footer className="border-t border-border/40 bg-muted/30 py-12 md:py-16">
    <div className="container mx-auto px-8 2xl:max-w-[1400px]">
      <div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} GatherFlow. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
)