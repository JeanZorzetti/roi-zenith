import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { ArrowLeft, Clock, User, Calendar, Share2, BookOpen, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === slug);
    if (foundPost) {
      setPost(foundPost);
      
      // Find related posts (same category or similar tags)
      const related = blogPosts
        .filter(p => p.id !== foundPost.id)
        .filter(p => 
          p.category === foundPost.category || 
          p.tags.some(tag => foundPost.tags.includes(tag))
        )
        .slice(0, 3);
      
      setRelatedPosts(related);
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen pt-20 bg-pure-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-pure-white mb-4">Post não encontrado</h1>
          <Button 
            onClick={() => navigate('/resources/blog')}
            className="bg-primary-600 hover:bg-primary-700 text-pure-white font-light"
          >
            Voltar ao Blog
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'Sales': 'bg-green-600/20 text-green-400 border-green-600/30',
      'Technology': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
      'Case Study': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
      'Best Practices': 'bg-primary-600/20 text-primary-400 border-primary-600/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600/20 text-gray-400 border-gray-600/30';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-pure-black">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300 z-50"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="pt-20">
        <AnimatedSection className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <button 
              onClick={() => navigate('/resources')}
              className="hover:text-primary-400 transition-colors"
            >
              Recursos
            </button>
            <ChevronRight className="w-4 h-4" />
            <button 
              onClick={() => navigate('/resources/blog')}
              className="hover:text-primary-400 transition-colors"
            >
              Blog
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-500">{post.title}</span>
          </nav>

          {/* Back Button */}
          <Button
            onClick={() => navigate('/resources/blog')}
            variant="ghost"
            className="text-gray-400 hover:text-pure-white mb-8 p-0 font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Blog
          </Button>

          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Badge className={`${getCategoryColor(post.category)} font-light`}>
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 font-light">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-light text-pure-white mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-800/50">
                <div className="flex items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <div>
                      <div className="text-pure-white font-medium">{post.author.name}</div>
                      <div className="text-sm">{post.author.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min de leitura</span>
                  </div>
                </div>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 font-light"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-12">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-light text-pure-white mb-6 mt-12 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-light text-pure-white mb-4 mt-10">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-light text-pure-white mb-4 mt-8">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 font-light leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="text-gray-300 font-light leading-relaxed mb-6 pl-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="text-gray-300 font-light leading-relaxed mb-6 pl-6 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-300">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-primary-400 font-medium">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-800/50 text-primary-400 px-2 py-1 rounded font-mono text-sm">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto mb-6">
                      <code className="text-gray-300 font-mono text-sm">
                        {children}
                      </code>
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary-600 pl-6 my-6 italic text-gray-400">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-gray-800/50">
              <span className="text-gray-400 font-light mr-2">Tags:</span>
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="border-gray-600/50 text-gray-300 bg-gray-800/30 font-light"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-primary-900/20 to-secondary-900/10 border border-primary-500/30 rounded-2xl p-8 mb-12">
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-2xl font-light text-pure-white mb-4">
                  Gostou do conteúdo?
                </h3>
                <p className="text-gray-300 font-light mb-6 max-w-2xl mx-auto">
                  Descubra como implementar essas estratégias na sua empresa. 
                  Agende uma consultoria gratuita com nossos especialistas.
                </p>
                <Button
                  onClick={() => navigate('/contact', { 
                    state: { 
                      subject: `Consultoria sobre: ${post.title}`,
                      message: `Olá! Li o artigo "${post.title}" no blog e gostaria de saber mais sobre como implementar essas estratégias na minha empresa. Podemos agendar uma conversa?`
                    } 
                  })}
                  className="bg-primary-600 hover:bg-primary-700 text-pure-white font-light px-8 py-3"
                >
                  Agendar Consultoria Gratuita
                </Button>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-light text-pure-white mb-8">Artigos Relacionados</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                    onClick={() => navigate(`/resources/blog/${relatedPost.id}`)}
                  >
                    <div className="p-6">
                      <Badge className={`${getCategoryColor(relatedPost.category)} font-light mb-4`}>
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-lg font-light text-pure-white mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 font-light text-sm line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.author.name}</span>
                        <span>{relatedPost.readTime} min</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default BlogPostPage;