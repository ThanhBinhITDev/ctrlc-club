import Link from "next/link";

export default function Footer({ content }: any) {
  if (!content) return null;

  return (
    <footer className="bg-white px-4 pb-12 pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="font-display text-4xl font-black tracking-tighter text-foreground uppercase">
              {content.title}
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              {content.description}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand">Contact</p>
              <div className="space-y-2">
                <p className="text-sm font-bold text-foreground">{content.email}</p>
                <p className="text-sm text-muted">{content.address}</p>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand">Navigation</p>
              <div className="flex flex-col gap-3">
                {content.links?.map((link: any) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-sm font-medium text-foreground transition hover:text-brand"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            {content.copyright}
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Privacy</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
