import { cn } from '@/lib/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-white/10', className)}
      {...props}
    />
  );
}

// Pre-built skeleton patterns
export function SkeletonCard() {
  return (
    <div className="glass-card p-6 space-y-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function SkeletonBlogPost() {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonPricingCard() {
  return (
    <div className="glass-card p-8 space-y-6">
      <Skeleton className="h-5 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-12 w-full rounded-lg" />
      <div className="space-y-3 pt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="glass-card p-6 space-y-3">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
