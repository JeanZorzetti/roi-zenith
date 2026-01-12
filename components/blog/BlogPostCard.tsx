import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar?: string;
  };
  coverImage?: string;
}

export default function BlogPostCard({
  slug,
  title,
  excerpt,
  category,
  date,
  readTime,
  author,
  coverImage,
}: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="glass-card group hover:bg-white/5 transition-all duration-300 overflow-hidden block"
    >
      {/* Cover Image */}
      {coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pure-black/60 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-primary-600">{category}</Badge>
        </div>
      ) : (
        <div className="relative aspect-[16/9] bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
          <Badge className="bg-primary-600">{category}</Badge>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-medium mb-3 text-pure-white group-hover:text-primary-400 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">{excerpt}</p>

        {/* Author */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-xs text-primary-400 font-medium">
                {author.name.charAt(0)}
              </div>
            )}
            <span className="text-sm text-text-secondary">{author.name}</span>
          </div>

          {/* Read More */}
          <div className="flex items-center gap-1 text-primary-400 text-sm group-hover:gap-2 transition-all">
            Ler mais
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
